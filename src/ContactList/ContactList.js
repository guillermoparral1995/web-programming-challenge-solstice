import React from "react";
import ContactCard from "./ContactCard/ContactCard";
import './ContactList.scss';

const ContactList = ({favorites, others}) => {
    const contactPath = (contact) => `/contact/${contact.name.toLowerCase().replace(' ', '-')}`;

    return <div className='contact-list'>
        <div className='header'>Contacts</div>
        <div className="subheader">Favorite Contacts</div>
        <div className='contacts-container'>
            {favorites.map((contact, idx) =>
                <ContactCard key={idx} contactInfo={contact} linkPath={contactPath(contact)}/>
            )}
        </div>
        <div className="subheader">Other Contacts</div>
        <div className='contacts-container'>
            {others.map((contact, idx) =>
                <ContactCard key={idx} contactInfo={contact} linkPath={contactPath(contact)}/>
            )}
        </div>
    </div>
};

export default ContactList;