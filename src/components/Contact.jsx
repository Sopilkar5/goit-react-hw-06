import { FaUser, FaPhone } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';
import styles from "./ContactList/ContactList.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactInfo}>
        <p className={styles.contactRow}>
          <FaUser className={styles.icon} />
          <span className={styles.contactName}>{contact.name}</span>
        </p>
        <p className={styles.contactRow}>
          <FaPhone className={styles.icon} />
          <span className={styles.contactNumber}>{contact.number}</span>
        </p>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
       Delete
      </button>
    </li>
  );
}