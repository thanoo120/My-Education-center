-- Auto-generated role IDs: STU001, TUT001, PAR001
-- Run each block on your education_db database (MySQL 5.7+).

-- 1) Students: add student_code (e.g. STU001)
ALTER TABLE students ADD COLUMN student_code VARCHAR(10) NULL AFTER id;
ALTER TABLE students ADD UNIQUE INDEX uk_students_student_code (student_code);

-- Backfill existing rows (run after column exists):
-- UPDATE students s JOIN (SELECT id, @r := @r + 1 AS rn FROM students, (SELECT @r := 0) v ORDER BY id) t ON s.id = t.id SET s.student_code = CONCAT('STU', LPAD(t.rn, 3, '0'));
-- ALTER TABLE students MODIFY COLUMN student_code VARCHAR(10) NOT NULL;

-- 2) Tutor: add tutor_code (e.g. TUT001)
ALTER TABLE tutor ADD COLUMN tutor_code VARCHAR(10) NULL AFTER tutor_id;
ALTER TABLE tutor ADD UNIQUE INDEX uk_tutor_tutor_code (tutor_code);

-- 3) Parent: add parent_code (e.g. PAR001)
ALTER TABLE parent ADD COLUMN parent_code VARCHAR(10) NULL AFTER parent_id;
ALTER TABLE parent ADD UNIQUE INDEX uk_parent_parent_code (parent_code);

-- For existing data: run backfill updates then set NOT NULL. New registrations will get codes via the app.
