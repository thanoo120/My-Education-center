const db = require('../models/db');

const SubjectModel = {
   
    createSubject: ({ subject_id, subject_name, tutor_id, fees }) => {
        return db.query(
            'INSERT INTO subject (subject_id, subject_name, tutor_id, fees) VALUES (?, ?, ?, ?)',
            [subject_id, subject_name, tutor_id, fees]
        );
    },


    getAllSubjects: () => {
        return db.query('SELECT * FROM subject');
    },

   
    getTutorSubjects: (tutor_id) => {
        return db.query(
            'SELECT * FROM subject WHERE tutor_id = ?',
            [tutor_id]
        );
    },

 
    getSubject: (subject_id) => {
        return db.query(
            'SELECT * FROM subject WHERE subject_id = ?',
            [subject_id]
        );
    },

    getTutorDetailsForSubject: (subject_name) => {
        return db.query(
            `SELECT s.subject_id, s.subject_name, s.fees, t.tutor_name,s.tutor_id
             FROM subject s
             INNER JOIN tutor t ON s.tutor_id = t.tutor_id 
             WHERE s.subject_name = ?`,
            [subject_name]
        );
    },

    getFullSubjectsDetails: ()=>{
        return db.query(
            `SELECT s.subject_id, s.subject_name, s.fees, t.tutor_name ,t.tutor_id
             FROM subject s
             INNER JOIN tutor t ON s.tutor_id = t.tutor_id`
        )
    }

};

module.exports = SubjectModel;
