package com.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.UUID;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisLockService {
    private static final DefaultRedisScript<Long> RELEASE_SCRIPT = new DefaultRedisScript<>(
            "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                    "return redis.call('del', KEYS[1]) " +
                    "else return 0 end",
            Long.class
    );

    private final StringRedisTemplate redisTemplate;

    @Value("${app.registration-lock.ttl-ms:10000}")
    private long ttlMillis;

    @Value("${app.registration-lock.wait-timeout-ms:3000}")
    private long waitTimeoutMillis;

    @Value("${app.registration-lock.retry-interval-ms:100}")
    private long retryIntervalMillis;

    public <T> T executeWithLock(String lockKey, Supplier<T> action) {
        String token = UUID.randomUUID().toString();
        long deadline = System.currentTimeMillis() + waitTimeoutMillis;

        while (System.currentTimeMillis() <= deadline) {
            if (tryAcquire(lockKey, token)) {
                try {
                    return action.get();
                } finally {
                    release(lockKey, token);
                }
            }

            sleepBeforeRetry();
        }

        throw new RuntimeException("Course section is busy. Please try again");
    }

    private boolean tryAcquire(String lockKey, String token) {
        try {
            return Boolean.TRUE.equals(redisTemplate.opsForValue()
                    .setIfAbsent(lockKey, token, Duration.ofMillis(ttlMillis)));
        } catch (RedisConnectionFailureException ex) {
            throw new RuntimeException("Registration lock service is unavailable", ex);
        }
    }

    private void release(String lockKey, String token) {
        try {
            redisTemplate.execute(RELEASE_SCRIPT, Collections.singletonList(lockKey), token);
        } catch (RuntimeException ex) {
            log.warn("Failed to release Redis lock {}", lockKey, ex);
        }
    }

    private void sleepBeforeRetry() {
        try {
            Thread.sleep(retryIntervalMillis);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Interrupted while waiting for registration lock", ex);
        }
    }
}
