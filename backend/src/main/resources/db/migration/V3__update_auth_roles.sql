ALTER TABLE public.roles
DROP CONSTRAINT IF EXISTS roles_name_check;

UPDATE public.roles
SET name = 'LECTURER',
    description = 'Lecturer role'
WHERE name = 'TEACHER';

ALTER TABLE public.roles
    ADD CONSTRAINT roles_name_check CHECK (
        (name)::text = ANY (
    (ARRAY[
    'ADMIN',
    'STUDENT',
    'LECTURER',
    'ACADEMIC_ADVISOR'
    ]::varchar[])::text[]
    )
    );

INSERT INTO public.roles (name, description, created_at)
VALUES
    ('ACADEMIC_ADVISOR', 'Academic advisor role', now())
    ON CONFLICT (name) DO NOTHING;