import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

import authRoutes from './routes/authRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import examRoutes from './routes/examRoutes.js';
import examMarksRoutes from './routes/examMarksRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import stripeRoutes from './routes/stripe.js';
import paymentRoutes from './routes/paymentRoutes.js';
import feesRoutes from './routes/feesRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import subjecttudentRoutes from './routes/subject_studentRoutes.js';
import dashboardRoutes from '../backend/routes/dashboardRoutes.js';
import messageRoutes from './routes/messagesRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients (no Origin header) and configured frontend origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(json());
app.use('/api/exams', examRoutes);
app.use('/api/exam-marks', examMarksRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/subjects',subjectRoutes);
app.use('/api/subjectstudent',subjecttudentRoutes)
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/content', contentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
