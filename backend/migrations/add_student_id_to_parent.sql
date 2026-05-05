-- Add student_id as foreign key to parent table (links parent to a student)
-- Run this migration on your education_db database.

ALTER TABLE parent
ADD COLUMN student_id INT NULL,
ADD CONSTRAINT fk_parent_student
  FOREIGN KEY (student_id) REFERENCES students(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

-- Optional: index for faster lookups by student_id
CREATE INDEX idx_parent_student_id ON parent(student_id);
