package com.example.backend.service;

import com.example.backend.constant.EnrollmentStatus;
import com.example.backend.constant.GradeStatus;
import com.example.backend.constant.StudentAcademicStatus;
import com.example.backend.constant.TuitionStatus;
import com.example.backend.dto.response.ReportResponse;
import com.example.backend.entity.CourseSection;
import com.example.backend.entity.Enrollment;
import com.example.backend.entity.EnrollmentGrade;
import com.example.backend.entity.Student;
import com.example.backend.entity.TuitionRecord;
import com.example.backend.repository.CourseSectionRepository;
import com.example.backend.repository.EnrollmentGradeRepository;
import com.example.backend.repository.EnrollmentRepository;
import com.example.backend.repository.StudentRepository;
import com.example.backend.repository.TuitionRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReportService {
    private static final Set<EnrollmentStatus> GRADE_ELIGIBLE_STATUSES =
            Set.of(EnrollmentStatus.ENROLLED, EnrollmentStatus.PASSED, EnrollmentStatus.FAILED);

    private final CourseSectionRepository courseSectionRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentGradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final TuitionRecordRepository tuitionRecordRepository;

    public List<ReportResponse.ClassFillRate> getClassFillRates(Integer semesterId) {
        return findCourseSections(semesterId).stream()
                .map(this::mapClassFillRate)
                .toList();
    }

    public List<ReportResponse.GradeProgress> getGradeProgress(Integer semesterId) {
        return findCourseSections(semesterId).stream()
                .map(this::mapGradeProgress)
                .toList();
    }

    public List<ReportResponse.StudentStatusSummary> getStudentStatusSummary() {
        Map<StudentAcademicStatus, Long> counts = new EnumMap<>(StudentAcademicStatus.class);

        for (StudentAcademicStatus status : StudentAcademicStatus.values()) {
            counts.put(status, 0L);
        }

        for (Student student : studentRepository.findAll()) {
            counts.put(student.getAcademicStatus(), counts.get(student.getAcademicStatus()) + 1);
        }

        return counts.entrySet().stream()
                .map(entry -> {
                    ReportResponse.StudentStatusSummary response = new ReportResponse.StudentStatusSummary();
                    response.setStatus(entry.getKey());
                    response.setStudentCount(entry.getValue());
                    return response;
                })
                .toList();
    }

    public List<ReportResponse.TuitionSummary> getTuitionSummary(Integer semesterId) {
        Map<TuitionStatus, TuitionAccumulator> summary = new EnumMap<>(TuitionStatus.class);

        for (TuitionStatus status : TuitionStatus.values()) {
            summary.put(status, new TuitionAccumulator());
        }

        List<TuitionRecord> records = semesterId == null
                ? tuitionRecordRepository.findAll()
                : tuitionRecordRepository.findBySemesterId(semesterId);

        for (TuitionRecord record : records) {
            summary.get(record.getStatus()).add(record);
        }

        return summary.entrySet().stream()
                .map(entry -> {
                    TuitionAccumulator accumulator = entry.getValue();

                    ReportResponse.TuitionSummary response = new ReportResponse.TuitionSummary();
                    response.setStatus(entry.getKey());
                    response.setRecordCount(accumulator.recordCount);
                    response.setTotalAmount(accumulator.totalAmount);
                    response.setPaidAmount(accumulator.paidAmount);
                    response.setOutstandingAmount(accumulator.totalAmount.subtract(accumulator.paidAmount));
                    return response;
                })
                .toList();
    }

    public List<ReportResponse.GradeStatusSummary> getGradeStatusSummary() {
        Map<GradeStatus, Long> counts = new EnumMap<>(GradeStatus.class);

        for (GradeStatus status : GradeStatus.values()) {
            counts.put(status, 0L);
        }

        for (EnrollmentGrade grade : gradeRepository.findAll()) {
            counts.put(grade.getStatus(), counts.get(grade.getStatus()) + 1);
        }

        return counts.entrySet().stream()
                .map(entry -> {
                    ReportResponse.GradeStatusSummary response = new ReportResponse.GradeStatusSummary();
                    response.setStatus(entry.getKey());
                    response.setGradeCount(entry.getValue());
                    return response;
                })
                .toList();
    }

    public String exportClassFillRatesCsv(Integer semesterId) {
        List<String[]> rows = getClassFillRates(semesterId).stream()
                .map(report -> new String[]{
                        report.getCourseSectionId().toString(),
                        report.getCourseSectionCode(),
                        report.getCourseCode(),
                        report.getCourseName(),
                        report.getLecturerCode(),
                        report.getLecturerName(),
                        report.getSemesterCode(),
                        report.getSemesterName(),
                        report.getCapacity().toString(),
                        report.getEnrolledCount().toString(),
                        report.getAvailableSeats().toString(),
                        report.getFillRatePercent().toPlainString()
                })
                .toList();

        return toCsv(new String[]{
                "courseSectionId",
                "courseSectionCode",
                "courseCode",
                "courseName",
                "lecturerCode",
                "lecturerName",
                "semesterCode",
                "semesterName",
                "capacity",
                "enrolledCount",
                "availableSeats",
                "fillRatePercent"
        }, rows);
    }

    public String exportGradeProgressCsv(Integer semesterId) {
        List<String[]> rows = getGradeProgress(semesterId).stream()
                .map(report -> new String[]{
                        report.getCourseSectionId().toString(),
                        report.getCourseSectionCode(),
                        report.getCourseCode(),
                        report.getCourseName(),
                        report.getLecturerCode(),
                        report.getLecturerName(),
                        report.getSemesterCode(),
                        report.getSemesterName(),
                        report.getTotalStudents().toString(),
                        report.getDraftGrades().toString(),
                        report.getPublishedGrades().toString(),
                        report.getMissingGrades().toString(),
                        report.getPublishRatePercent().toPlainString()
                })
                .toList();

        return toCsv(new String[]{
                "courseSectionId",
                "courseSectionCode",
                "courseCode",
                "courseName",
                "lecturerCode",
                "lecturerName",
                "semesterCode",
                "semesterName",
                "totalStudents",
                "draftGrades",
                "publishedGrades",
                "missingGrades",
                "publishRatePercent"
        }, rows);
    }

    public String exportStudentStatusSummaryCsv() {
        List<String[]> rows = getStudentStatusSummary().stream()
                .map(report -> new String[]{
                        report.getStatus().name(),
                        report.getStudentCount().toString()
                })
                .toList();

        return toCsv(new String[]{"status", "studentCount"}, rows);
    }

    public String exportTuitionSummaryCsv(Integer semesterId) {
        List<String[]> rows = getTuitionSummary(semesterId).stream()
                .map(report -> new String[]{
                        report.getStatus().name(),
                        report.getRecordCount().toString(),
                        report.getTotalAmount().toPlainString(),
                        report.getPaidAmount().toPlainString(),
                        report.getOutstandingAmount().toPlainString()
                })
                .toList();

        return toCsv(new String[]{
                "status",
                "recordCount",
                "totalAmount",
                "paidAmount",
                "outstandingAmount"
        }, rows);
    }

    private List<CourseSection> findCourseSections(Integer semesterId) {
        List<CourseSection> sections = semesterId == null
                ? courseSectionRepository.findAll()
                : courseSectionRepository.findBySemesterId(semesterId);

        return sections.stream()
                .sorted(Comparator.comparing(section -> section.getCourse().getCode() + "-" + section.getCode()))
                .toList();
    }

    private ReportResponse.ClassFillRate mapClassFillRate(CourseSection section) {
        ReportResponse.ClassFillRate response = new ReportResponse.ClassFillRate();
        mapSection(response, section);

        int capacity = section.getCapacity();
        int enrolledCount = section.getEnrolledCount();

        response.setCapacity(capacity);
        response.setEnrolledCount(enrolledCount);
        response.setAvailableSeats(Math.max(0, capacity - enrolledCount));
        response.setFillRatePercent(toPercent(enrolledCount, capacity));

        return response;
    }

    private ReportResponse.GradeProgress mapGradeProgress(CourseSection section) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseSectionId(section.getId()).stream()
                .filter(enrollment -> GRADE_ELIGIBLE_STATUSES.contains(enrollment.getStatus()))
                .toList();

        List<EnrollmentGrade> grades = gradeRepository.findByEnrollmentCourseSectionId(section.getId()).stream()
                .filter(grade -> GRADE_ELIGIBLE_STATUSES.contains(grade.getEnrollment().getStatus()))
                .toList();

        int totalStudents = enrollments.size();
        int draftGrades = (int) grades.stream()
                .filter(grade -> grade.getStatus() == GradeStatus.DRAFT)
                .count();
        int publishedGrades = (int) grades.stream()
                .filter(grade -> grade.getStatus() == GradeStatus.PUBLISHED)
                .count();
        int missingGrades = Math.max(0, totalStudents - grades.size());

        ReportResponse.GradeProgress response = new ReportResponse.GradeProgress();
        mapSection(response, section);
        response.setTotalStudents(totalStudents);
        response.setDraftGrades(draftGrades);
        response.setPublishedGrades(publishedGrades);
        response.setMissingGrades(missingGrades);
        response.setPublishRatePercent(toPercent(publishedGrades, totalStudents));

        return response;
    }

    private void mapSection(ReportResponse.ClassFillRate response, CourseSection section) {
        response.setCourseSectionId(section.getId());
        response.setCourseSectionCode(section.getCode());

        response.setCourseId(section.getCourse().getId());
        response.setCourseCode(section.getCourse().getCode());
        response.setCourseName(section.getCourse().getName());

        response.setLecturerId(section.getLecturer().getId());
        response.setLecturerCode(section.getLecturer().getLecturerCode());
        response.setLecturerName(section.getLecturer().getFullName());

        response.setSemesterId(section.getSemester().getId());
        response.setSemesterCode(section.getSemester().getCode());
        response.setSemesterName(section.getSemester().getName());
    }

    private void mapSection(ReportResponse.GradeProgress response, CourseSection section) {
        response.setCourseSectionId(section.getId());
        response.setCourseSectionCode(section.getCode());

        response.setCourseId(section.getCourse().getId());
        response.setCourseCode(section.getCourse().getCode());
        response.setCourseName(section.getCourse().getName());

        response.setLecturerId(section.getLecturer().getId());
        response.setLecturerCode(section.getLecturer().getLecturerCode());
        response.setLecturerName(section.getLecturer().getFullName());

        response.setSemesterId(section.getSemester().getId());
        response.setSemesterCode(section.getSemester().getCode());
        response.setSemesterName(section.getSemester().getName());
    }

    private BigDecimal toPercent(int numerator, int denominator) {
        if (denominator <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return BigDecimal.valueOf(numerator)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(denominator), 2, RoundingMode.HALF_UP);
    }

    private String toCsv(String[] header, List<String[]> rows) {
        StringBuilder builder = new StringBuilder();
        appendCsvRow(builder, header);

        for (String[] row : rows) {
            appendCsvRow(builder, row);
        }

        return builder.toString();
    }

    private void appendCsvRow(StringBuilder builder, String[] values) {
        for (int i = 0; i < values.length; i++) {
            if (i > 0) {
                builder.append(',');
            }

            builder.append(escapeCsv(values[i]));
        }

        builder.append('\n');
    }

    private String escapeCsv(String value) {
        if (value == null) {
            return "";
        }

        String escaped = value.replace("\"", "\"\"");

        if (escaped.contains(",") || escaped.contains("\"") || escaped.contains("\n") || escaped.contains("\r")) {
            return "\"" + escaped + "\"";
        }

        return escaped;
    }

    private static class TuitionAccumulator {
        private long recordCount;
        private BigDecimal totalAmount = BigDecimal.ZERO;
        private BigDecimal paidAmount = BigDecimal.ZERO;

        private void add(TuitionRecord record) {
            recordCount++;
            totalAmount = totalAmount.add(record.getTotalAmount());
            paidAmount = paidAmount.add(record.getPaidAmount());
        }
    }
}
