import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedTitle = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedTitle;
    });
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(4),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.Box}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} contacts={contacts} />

      <div className={css.ContactsBox}>
        <h2>Contacts</h2>

        {contacts.length > 0 && <Filter onChange={changeFilter} />}

        {isDublicate && (
          <ContactList
            onDeleteContact={deleteContact}
            contacts={filteredContacts}
          />
        )}
        {contacts.length === 0 && (
          <p className={css.notificationMessage}>
            There are no contacts in your phonebook
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContact = JSON.parse(contacts);

//     if (parsedContact && parsedContact.length) {
//       this.setState({ contacts: parsedContact });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   addContact = (name, number) => {
//     const { contacts } = this.state;
//     if (
//       contacts.some(
//         contact => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts`);
//     } else {
//       const newContact = {
//         id: nanoid(4),
//         name: name,
//         number: number,
//       };

//       this.setState(({ contacts }) => ({
//         contacts: [...contacts, newContact],
//       }));
//     }
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContact = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter, contacts } = this.state;
//     const visibleContact = this.getVisibleContact();
//     return (
//       <div className={css.Box}>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} contacts={contacts} />

//         <div className={css.ContactsBox}>
//           <h2>Contacts</h2>
//           {contacts.length > 0 && (
//             <Filter value={filter} onChange={this.changeFilter} />
//           )}
//           {contacts.length > 0 ? (
//             <ContactList
//               contacts={visibleContact}
//               onDeleteContact={this.deleteContact}
//             />
//           ) : (
//             <p className={css.notificationMessage}>
//               There are no contacts in your phonebook
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
