import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="nameBook">Phone Book</h1>
        <ContactForm />
        <SearchBox />
      </div>
      <div className="contacts-container">
        <ContactList />
      </div>
    </div>
  );
}