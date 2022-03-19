const { uuid } = require('uuidv4');

const contacts = [
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
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }
}

module.exports = new ContactsRepositories();
