import React, { useState, useEffect } from "react";

const ContactsView = ({ contacts, onAdd, onDelete, onView, onEdit }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Contacts in ContactsView:", contacts);
  }, [contacts]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-white">All Contacts</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onAdd}
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
        {contacts
          .filter(
            (contact) =>
              contact.name?.toLowerCase().includes(search.toLowerCase()) ||
              contact.mobile?.includes(search)
          )
          .map((contact) => (
            <li key={contact.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{contact.name}</h2>
                  <p className="text-gray-600">{contact.mobile}</p>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => onView(contact)}>👁</button>
                  <button onClick={() => onEdit(contact)}>✏</button>
                  <button onClick={() => onDelete(contact.id)}>🗑</button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsView;