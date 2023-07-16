import React from 'react';
import '../css/Cards.css';

function Cards({itemsData}) {
return (
<div className="cards1">
{
itemsData.length >= 1 ? (itemsData.map((item) => {
return (
<div className="card1" key={item.doctorid}>
<div className="imagecontainer">
<img src={item.image_url} alt='doctor' className="image"/>
</div>
<div className="info1">
<h3> {item.name} </h3>
<div> {item.specialite} </div>
<div> {item.phone_number} </div>
<div> {item.baladia} </div>
<button className="btn1">Voir Profile</button>
</div>
</div>
);
})) : <h1> rien </h1>
}
</div>
);
}

export default Cards;
