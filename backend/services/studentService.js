const studentRepository = require('../repositories/studentRepository');

class StudentService {
  async getStudentById(id) {
    return await studentRepository.findById(id);
  }

  async getAllStudents() {
    return await studentRepository.findAll();
  }

  async deleteStudent(id) {
    return await studentRepository.deleteById(id);
  }

  async updateStudent(id, studentData) {
    return await studentRepository.updateById(id, studentData);
  }

  async getStudentProfile(id) {
    return await studentRepository.getProfile(id);
  }

  async getStudentAttendance(id) {
    return await studentRepository.getAttendance(id);
  }

  async getStudentPerformance(email) {
    return await studentRepository.getPerformance(email);
  }

  async getStudentFees(id) {
    return await studentRepository.getFees(id);
  }

  async getStudentReceipts(id) {
    return await studentRepository.getReceipts(id);
  }

  async getStudentReports() {
    return await studentRepository.getStudentReports();
  }
}

module.exports = new StudentService();