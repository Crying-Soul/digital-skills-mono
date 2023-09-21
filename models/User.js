class User {
  async getAll() {
    return await db.query(`SELECT * FROM users;`);
  }

  async createUser(email, password, token = null) {
    return await db.query(
      `INSERT INTO users (email, uniq_id, password, token) VALUES (?,?,?,?) RETURNING *;`,
      [email, uuidv4(), password, token]
    );

  }
  async isUserExists(email) {
    console.log(await db.query(`SELECT * FROM users WHERE email=?;`, [email]));
    return (
      (await db.query(`SELECT * FROM users WHERE email=?;`, [email])).length > 0
    );
  }

  async findOne(email) {
    return (await db.query(`SELECT * FROM users WHERE email=?;`, [email]))[0];
  }
  async updateToken(email, token) {
    return await db.query(`UPDATE users SET token = ? WHERE email = ?;`, [
      token,
      email,
    ]);
  }
  async findByToken(token) {
    return (await db.query(`SELECT * FROM users WHERE token=?;`, [token]))[0];
  }
}

module.exports = new User();