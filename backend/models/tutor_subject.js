const db = require('./db');

const tutor_subject={

createTutorSubject:({tutor_id,subject_name,experience,description})=>{

     return db.query(
    'INSERT INTO tutor_subject (tutor_id, subject_name,experience,description) VALUES (?, ?, ?, ?)',
    [tutor_id, subject_name,experience,description]
  );
}

}