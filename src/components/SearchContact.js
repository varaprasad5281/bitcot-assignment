import React, { useState } from 'react';

const SearchContact = ({ contacts }) => {
  const [query, setQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
    contact.phone.includes(query)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.firstName}  - {contact.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchContact;
