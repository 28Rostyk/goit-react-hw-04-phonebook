import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ onChange }) => (
  <label>
    Find contacts by name
    <input className={css.Filter} type="text" onChange={onChange} />
  </label>
);

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
