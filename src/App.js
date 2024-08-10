import React, { useState, useEffect } from 'react';
import ContactsView from './components/ContactsView';
import AddEditContact from './components/AddEditContact';
import ViewContact from './components/ViewContactDetails';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then(response => {
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      })
      .catch(error => console.error("Error fetching the contacts:", error));
  }, []);

  useEffect(() => {
    console.log("Contacts in App:", contacts);
  }, [contacts]);

  const handleAddEditContact = (contact) => {
    if (contact.id) {
      // Edit existing contact
      setContacts(prevContacts =>
        prevContacts.map(c => (c.id === contact.id ? contact : c))
      );
    } else {
      // Add new contact
      contact.id = uuidv4(); // Generate a new ID for the new contact
      setContacts(prevContacts => [...prevContacts, contact]);
    }

    setIsAddEditModalOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsAddEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <ContactsView
        contacts={contacts}
        onAdd={() => {
          setSelectedContact(null);
          setIsAddEditModalOpen(true);
        }}
        onDelete={handleDeleteContact}
        onView={handleViewContact}
        onEdit={handleEditContact}
      />
      {isAddEditModalOpen && (
        <AddEditContact
          contact={selectedContact}
          onSave={handleAddEditContact}
          onClose={() => setIsAddEditModalOpen(false)}
        />
      )}
      {isViewModalOpen && (
        <ViewContact
          contact={selectedContact}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
