import db from "@/assets/library/db";

// Columns are snake_case in MySQL; this model exposes camelCase to the rest of the app.
const SELECT_FIELDS = "id, postal_code AS postalCode, name, description";

export default class StateModel {
  static async findAll() {
    const [rows] = await db.query(`SELECT ${SELECT_FIELDS} FROM state ORDER BY id`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(`SELECT ${SELECT_FIELDS} FROM state WHERE id = ?`, [id]);
    return rows[0] ?? null;
  }

  static async insert({ postalCode, name, description }) {
    const [result] = await db.query(
      "INSERT INTO state (postal_code, name, description) VALUES (?, ?, ?)",
      [postalCode, name, description],
    );
    return StateModel.findById(result.insertId);
  }

  static async update(id, { postalCode, name, description }) {
    await db.query(
      "UPDATE state SET postal_code = ?, name = ?, description = ? WHERE id = ?",
      [postalCode, name, description, id],
    );
    return StateModel.findById(id);
  }

  static async delete(id) {
    await db.query("DELETE FROM state WHERE id = ?", [id]);
  }
}
