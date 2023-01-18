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
      let res = [];
      for (let i = 0; i < subjects.length; i++) {
        res.push({
          sub_code: subjects[i].sub_code,
          sub_name: subjects[i].sub_name,
        });
      }
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editSubject(subjectData) {
    try {
      const subject = await SubjectModel.update(subjectData);
      return subject;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SubjectService();
