const db = require('../db');

class CampingSpot {
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM camping_spots');
      return rows;
    } catch (error) {
      console.error('Error fetching all camping spots:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM camping_spots WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error finding camping spot by id:', error);
      throw error;
    }
  }

}

module.exports = CampingSpot;
