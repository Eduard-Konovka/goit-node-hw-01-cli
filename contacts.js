const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join('db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const ids = contacts.map(contact => Number(contact.id));
  const sortId = ids.sort((a, b) => b - a);
  const newId = (sortId[0] + 1).toString();

  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateItems(contacts);
  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = { id: contactId, name, email, phone };
  await updateItems(contacts);
  return contacts[contactIdx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIdx, 1);
  await updateItems(contacts);
  return removedContact;
}

const updateItems = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
