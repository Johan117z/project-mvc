import db from "@/assets/library/db";

export default class PersonModel {
  static async findAll() {
    const [rows] = await db.query("SELECT id, name, email, phone FROM person ORDER BY id");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT id, name, email, phone FROM person WHERE id = ?", [id]);
    return rows[0] ?? null;
  }

  static async findByEmail(email) {
    const [rows] = await db.query("SELECT id, name, email, phone FROM person WHERE email = ?", [email]);
    return rows[0] ?? null;
  }

  static async insert({ name, email, phone }) {
    const [result] = await db.query(
      "INSERT INTO person (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone],
    );
    return PersonModel.findById(result.insertId);
  }

  static async update(id, { name, email, phone }) {
    await db.query(
      "UPDATE person SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id],
    );
    return PersonModel.findById(id);
  }

  static async delete(id) {
    await db.query("DELETE FROM person WHERE id = ?", [id]);
  }
}
