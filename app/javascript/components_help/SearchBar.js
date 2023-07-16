import React, { useState } from 'react';
import '../css/SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import searchimg from '../img/searche.png'
function SearchBar(props, { filterBySearch }) {
  const [searchValue, setSearchValue] = useState('');
    const { userData } = props;
  const onSearch = (e) => {
    e.preventDefault();
    filterBySearch(searchValue.toLowerCase());
  };

  return (
    <div className="containersearch">
      <div className="left">
        <div className="text-container">
        <h1 style={{ color: '#70a5d7', fontSize: '48px', textAlign: 'center', marginTop: '0', marginBottom: '20px', fontFamily: 'Pacifico, cursive' }}>
  Bonjour <span style={{ color: 'black', display: 'inline',fontSize:'30px' }}>{userData.patient_data.name}✌️</span>
</h1>
          <form className="search-bar" onSubmit={onSearch}>
            <div className="form">
              <input
                className="search"
                type="text"SearchDoctors
                placeholder="Chercher un médecin"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <button className="search-btn" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={searchimg} alt="doctor" />
      </div>
    </div>
  );
}

export default SearchBar;
