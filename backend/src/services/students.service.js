const StudentModel = require("../models/students.model");
class StudentService {
  async add(student) {
    try {
      const response = StudentModel.add(student);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllByClass(StudentData) {
    try {
      const Student = await StudentModel.getAllByClass(StudentData);
      return Student;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByRoll(studentData) {
    try {
      const students = await StudentModel.getByRoll(studentData);
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteStudent(studentData) {
    try {
      const students = await StudentModel.remove(studentData);
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new StudentService();
