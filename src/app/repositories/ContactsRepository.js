const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Igor',
    email: 'igor@email.com',
    phone: '923456789',
    category_id: uuid(),
  },
];

class ContactsRepositories {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepositories();
