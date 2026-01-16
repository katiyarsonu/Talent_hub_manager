const db = require('../config/database');

class Candidate {
  static async create(candidateData, userId) {
    const { name, email, phone, skills, experience, department } = candidateData;

    const pool = db.getPool();
    const [result] = await pool.query(
      'INSERT INTO candidates (name, email, phone, skills, experience, department, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, skills, experience, department, userId]
    );

    return {
      id: result.insertId,
      ...candidateData
    };
  }

  static async findAll(userId) {
    const pool = db.getPool();
    const [rows] = await pool.query(
      'SELECT * FROM candidates WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    return rows;
  }

  static async findById(id, userId) {
    const pool = db.getPool();
    const [rows] = await pool.query(
      'SELECT * FROM candidates WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, candidateData, userId) {
    const { name, email, phone, skills, experience, department } = candidateData;

    const pool = db.getPool();
    const [result] = await pool.query(
      'UPDATE candidates SET name = ?, email = ?, phone = ?, skills = ?, experience = ?, department = ? WHERE id = ? AND user_id = ?',
      [name, email, phone, skills, experience, department, id, userId]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.findById(id, userId);
  }

  static async delete(id, userId) {
    const pool = db.getPool();
    const [result] = await pool.query(
      'DELETE FROM candidates WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    return result.affectedRows > 0;
  }
}

module.exports = Candidate;