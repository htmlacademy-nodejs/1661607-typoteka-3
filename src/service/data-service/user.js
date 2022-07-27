'use strict';

module.exports = class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  async create(data) {
    const user = await this._User.create(data);
    return user.get();
  }

  async getUserByEmail(email) {
    const user = await this._User.findOne({
      where: {email}
    });
    return user && user.get();
  }
};
