const { uuid } = require('uuidv4');

const db = require('../../database');

let contacts = [
  {
    id: uuid(),
    name: 'Igor',
    email: 'igor@email.com',
    phone: '923456789',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Luiza',
    email: 'luiza@email.com',
    phone: '923456789',
    category_id: uuid(),
  },
];

class ContactsRepositories {
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM contacts
      WHERE id = $1
      ORDER BY ID DESC
      LIMIT 1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT *
      FROM contacts
      WHERE email = $1
      ORDER BY ID DESC
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

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepositories();
