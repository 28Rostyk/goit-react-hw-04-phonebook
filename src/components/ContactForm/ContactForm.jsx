import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  static defaultProps = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();
    this.props.onSubmit(name, number);
    const nameInContact = this.props.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (nameInContact) {
      this.setState({
        name: '',
      });
    } else {
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const labelId = nanoid();
    const { name, number } = this.state;
    return (
      <form className={css.addForm} onSubmit={this.handleSubmit}>
        <label htmlFor={labelId}>Name</label>
        <input
          className={css.addInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={labelId}
          onChange={this.handleChange}
        />
        <label htmlFor={labelId}>Phone</label>
        <input
          className={css.addInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={labelId}
          onChange={this.handleChange}
        />
        <button className={css.addButton}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
