/* eslint-disable jsx-a11y/alt-text */
import styles from '../css/SearchDoctors.module.css';
import Cards from '../components_help/Cards'
import Button from '../components_help/Button'
import  SearchBar  from '../components_help/SearchBar';
import {  useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import React from 'react';
  function Doctors(props) {
    const { userData } = props;
    const [itemsData, setItemData] = useState([]);
    const [itemsDataButton, setItemDataButton] = useState([]);

    useEffect(() => {
      fetch("/api/v1/doctors_list")
        .then((res) => res.json())
        .then((data) => {
          setItemData(data);
          setItemDataButton(data); // Set initial data to show all items
        });
    }, []);

    const Allsp = ["Tous", ...new Set(itemsData.map((i) => i.specialite))];
    const filterBySp = (sp) => {
      if (sp === "Tous") {
        setItemDataButton(itemsData);
      } else {
        const newArr = itemsData.filter((item) => item.specialite === sp);
        setItemDataButton(newArr);
      }
    };
    // get doctors with name or specialty or wilaya from db
    const filterBySearch = (word) => {
      if (word !== "") {
        const newArr = itemsData.filter((item) => item.name === word);
        setItemDataButton(newArr);
      }
    };

    return (
      <div className={styles.Doctors}>

        <div className={styles.Search}>
          {/* Pass filterBySearch function as a prop */}
          {/* You can also pass itemsDataButton as a prop to SearchBar component */}
          {<SearchBar userData={userData} />}
        </div>
        <div className={styles.specialty}>
          {/* Pass filterBySp and Allsp as props */}
          <Button filterBySp={filterBySp} Allsp={Allsp} />
        </div>
        <div className={styles.carddoc}>
          {/* Pass itemsDataButton as a prop */}
          <Cards itemsData={itemsDataButton} />
        </div>
        <div>

        </div>
      </div>
    );
  }

  export default Doctors;
  document.addEventListener("turbolinks:load", () => {
    const app = document.getElementById("search-doctors-container");
    app && createRoot(app).render(<Doctors />);
  });
