const contacts = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.log('\nContacts list: ');
      console.table(list);
      break;

    case 'get':
      const contactById = await contacts.getContactById(id.toString());
      if (!contactById) {
        throw new Error(`Contact with id = ${id} not found!`);
      }
      console.log('\nContact by id: ');
      console.table(contactById);
      break;

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      console.log('\nAdds contact: ');
      console.table(addContact);
      break;

    case 'update':
      const updateContact = await contacts.updateContact(
        id.toString(),
        name,
        email,
        phone,
      );
      if (!updateContact) {
        throw new Error(`Contact with id = ${id} not found!`);
      }
      console.log('\nUpdated contact: ');
      console.table(updateContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id.toString());
      if (!deleteContact) {
        throw new Error(`Contact with id = ${id} not found!`);
      }
      console.log('\nRemoved contact: ');
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

(async () => {
  await invokeAction(argv);
})();
