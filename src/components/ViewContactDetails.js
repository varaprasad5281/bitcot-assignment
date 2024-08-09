import React from 'react';

const ViewContact = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl mb-4">Contact Details</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Mobile:</strong> {contact.mobile}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Address:</strong> {contact.address}</p>


        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
