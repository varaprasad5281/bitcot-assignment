import React, { useState, useEffect } from 'react';
import AddEditContact from './AddEditContact';

const ContactsView = ({ contacts, onAdd, onDelete, onView, onEdit }) => {
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    console.log("Contacts in ContactsView:", contacts);
  }, [contacts]);

  const handleAddContact = (newContact) => {
    console.log("New Contact in ContactsView:", newContact);
    onAdd(newContact); // Add the new contact to the state in the parent component
    setIsAdding(false); // Close the modal after adding the contact
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-white">All Contacts</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAdding(true)}
        >
          Add Contact
        </button>
      </div>
      <input
        type="text"
        placeholder="Search Contact"
        className="w-full mb-4 p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="space-y-4">
        {contacts.filter(contact => 
          contact.name?.toLowerCase().includes(search.toLowerCase()) ||
          contact.mobile?.includes(search)
        ).map(contact => (
          <li key={contact.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{contact.name}</h2>
                <p className="text-gray-600">{contact.mobile}</p>
                <p className="text-gray-600">{contact.address}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onView(contact)}>
                  👁️
                </button>
                <button onClick={() => onEdit(contact)}>
                  ✏️
                </button>
                <button onClick={() => onDelete(contact.id)}>
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isAdding && (
        <AddEditContact
          onSave={handleAddContact}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  );
};

export default ContactsView;
