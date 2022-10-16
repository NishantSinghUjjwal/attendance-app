const SubjectModel = require("../models/subjects.model");
class SubjectService {
  async add(subject) {
    try {
      const response = SubjectModel.add(subject);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByCode(subjectData) {
    try {
      const subject = await SubjectModel.getByCode(subjectData.sub_code);
      return subject;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getList() {
    try {
      const subjects = await SubjectModel.getAll();
      return subjects;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SubjectService();
