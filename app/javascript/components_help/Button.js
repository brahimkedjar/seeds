import React from 'react';
import '../css/Button.css';
import CardiologueImage from '../img/heart.png';
import DentisteImage from '../img/tooth.png';
import PédiatreImage from '../img/baby.png';
import ChirurgienImage from '../img/chirugien.png';
import OncologueImage from '../img/Oncologue.png';
import Gastroentérologue from '../img/gastro.png';
function Button({ filterBySp, Allsp }) {
  const onFilter = (sp) => {
    filterBySp(sp);
  };

  const getImageBySpecialty = (specialty) => {
    switch (specialty) {
      case 'Cardiologue':
        return CardiologueImage;
      case 'Dentiste':
        return DentisteImage;
      case 'Pédiatre':
        return PédiatreImage;
      case 'Chirurgien':
        return ChirurgienImage;
      case 'Oncologue':
        return OncologueImage;
      case 'Gastroentérologue':
        return Gastroentérologue;
      case 'Generaliste':
        return Gastroentérologue;
      default:
        return null;
    }
  };

  return (
    <div className="conButton">
      <div className="name">
        <div className="specialty">Spécialités</div>
        <button className="btnSeeAll">Voir Tous</button>
      </div>
      <div className="buttonContainer">
        {Allsp.length >= 1 ? (
          Allsp.map((sp, index) => {
            const image = getImageBySpecialty(sp);
            return (
              <button className={`btnSp ${sp === 'Tous' ? 'btnSpTous' : ''}`} onClick={() => onFilter(sp)} key={index}>
                {image && <img src={image} alt={sp} className="btnSpImage" />}
                <div className="btnSpText">
                  {sp === 'Tous' ? (
                    <span style={{ marginTop: '22px' }}>
                      Tous <br />
                      <span className="subText">les médecins</span>
                    </span>
                  ) : (
                    sp
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <h4>rien</h4>
        )}
      </div>
    </div>
  );
}

export default Button;
