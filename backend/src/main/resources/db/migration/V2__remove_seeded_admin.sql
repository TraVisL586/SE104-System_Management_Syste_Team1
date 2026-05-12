-- Remove the old hard-coded admin seeded by V1.
-- Admin accounts should be created by application startup config/env instead.

WITH seeded_admin AS (
    SELECT id
    FROM users
    WHERE username = 'admin'
      AND email = 'admin@example.com'
      AND full_name = 'Admin'
      AND password_hash = '$2a$12$R3Q7ZRItTF8Ht6ny4Qo4JuwqG2unlVsnzDw2odpqCp7ggyX5lbj76'
),
     deleted_user_roles AS (
DELETE FROM user_roles
WHERE user_id IN (SELECT id FROM seeded_admin)
    )
DELETE FROM users
WHERE id IN (SELECT id FROM seeded_admin);