import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={css.contactItem}>
      <span className={css.contactName}>{name}:</span>
      <span className={css.contactNumber}>{number}</span>
      <button className={css.delButton} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};
export default ContactListItem;

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
