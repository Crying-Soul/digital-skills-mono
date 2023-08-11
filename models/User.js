const db = require("../db/db.js");
class User {
  async getAll() {
    return (await db.query(`SELECT * FROM users;`)).rows;
  }

  async createUser(name, email, password, token = null) {
    return (
      await db.query(
        `INSERT INTO users (name, email, password, token) VALUES ($1,$2,$3,$4) RETURNING *;`,
        [name, email, password, token]
      )
    ).rows[0];
  }
  async isUserExists(email) {
    return (
      await db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`, [
        email,
      ])
    ).rows[0].exists;
  }

  async findOne(email) {
    return (
      (await db.query(`SELECT * FROM users WHERE email = $1;`, [email]))
        .rows[0] || null
    );
  }
  async updateToken(email, token) {
    return (
      await db.query(
        `UPDATE users SET token = $2 WHERE email = $1 RETURNING *;`,
        [email, token]
      )
    ).rows[0];
  }
  async findByToken(token) {
    return (await db.query(`SELECT * FROM users WHERE token = $1`, [token]))
      .rows[0];
  }
}

module.exports = new User();
