-- Prevent duplicate records: add unique constraints where applicable.
-- Run on education_db. Skip any line if that constraint/index already exists.

-- Users: one account per email
ALTER TABLE users ADD UNIQUE INDEX uk_users_email (email);

-- Exam marks: one mark record per student per exam
ALTER TABLE exam_marks ADD UNIQUE INDEX uk_exam_marks_student_exam (student_email, exam_id);

-- Subject-student: one assignment per student per subject
ALTER TABLE subject_student ADD UNIQUE INDEX uk_subject_student (student_email, subject_id);

-- Attendance: one record per student per course per date (uncomment if your schema allows)
-- ALTER TABLE attendance ADD UNIQUE INDEX uk_attendance_student_course_date (student_email, course_id, date);
