import React from 'react'
import PropTypes from 'prop-types';

const ContactList = ({contact,handleDelete}, key ) => {
   
    return (
        <li className="listItem" key={key} >
            <p><span>Name:  </span> {contact.name}</p>
            <p><span>Number:  </span> {contact.number}</p>
            <button onClick={handleDelete} className="handleButton" name={contact.id}>Delete</button>
        </li>
    );
}

ContactList.propTypes = {
    contact: PropTypes.object,
  };

export default ContactList;