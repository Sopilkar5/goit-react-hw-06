import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters.name);

  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchLabel}>Search contact with name:</p>
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search contact..."
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}