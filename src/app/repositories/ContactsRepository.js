const db = require('../../database');

class ContactsRepositories {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT
        co.*,
        ca.name AS category_name
      FROM contacts co
      LEFT JOIN categories ca
        ON co.category_id = ca.id
      ORDER BY co.name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT
        co.*,
        ca.name AS category_name
      FROM contacts co
      LEFT JOIN categories ca
        ON co.category_id = ca.id
      WHERE co.id = $1
      ORDER BY id DESC
      LIMIT 1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT
        co.*,
        ca.name AS category_name
      FROM contacts co
      LEFT JOIN categories ca
        ON co.category_id = ca.id
      WHERE co.email = $1
      ORDER BY co.id DESC
      LIMIT 1
    `, [email]);

    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts where id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ContactsRepositories();
