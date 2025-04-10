import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required field'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Format: 123-45-67')
    .required('Required field'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const isDuplicateNumber = contacts.some(
        contact => contact.number === values.number
      );

      if (isDuplicateNumber) {
        throw new Error('A contact with this number already exists!');
      }

      const newContact = { id: nanoid(), ...values };
      dispatch(addContact(newContact));
      resetForm();
      setStatus({ success: 'Contact successfully added!' });
      setTimeout(() => {
        setStatus({ success: null });
      }, 1500);
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {};
  }, [contacts]);

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ status, touched, errors }) => (
        <Form className={styles.form}>
          <div>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
              <ErrorMessage name="name" component="div" className={styles.error} />
            )}
          </div>
          <div>
            <Field type="text" name="number" placeholder="Number of phone (123-45-67)" />
            {touched.number && errors.number && (
              <ErrorMessage name="number" component="div" className={styles.error} />
            )}
          </div>
          <button type="submit" className={styles.addButton}>
            Add Contact
          </button>
          {status?.error && <div className={styles.error}>{status.error}</div>}
          {status?.success && <div className={styles.success}>{status.success}</div>}
        </Form>
      )}
    </Formik>
  );
}