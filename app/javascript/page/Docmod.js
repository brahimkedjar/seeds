import { useEffect, useState } from 'react';
import '../css/Docmod.css'
function Docmod() {

// resive the api from db
const id = window.location.pathname.split("/").slice(-1)[0];
const [itemsData, setItemData] = useState([])
useEffect(
  ()=>{
    fetch("https://api.imgflip.com/get_memes/${id}")//dont forget /${id} to get the data of the dovtor from db
    .then((res) => res.json())
    .then((data) => setItemData(data.data.memes));
  },[]
)

  return (
    <div className="Docmod">
        <form>
            <div>
                <label htmlFor='image'> choose a picture </label>
                <input type="file" id="image" value={itemsData.image}/>
            </div>
            <div>
                <label htmlFor='name'> name </label>
                <input type='text' id='name' value={itemsData.name}/>
            </div>
            <div>
              <label htmlFor="specialty"> specialty </label>
              <select name="specialty" id="specialty">
                <option value="Cardiologue">Cardiologue</option>
                <option value="Dentiste ">Dentiste </option>
                <option value="Gastrologue">Gastrologue</option>
                <option value="Généraliste">Généraliste</option>
                <option value="Gynécologue ">Gynécologue </option>
                <option value="Hématologue">Hématologue</option>
                <option value="Néphrologue">Néphrologue</option>
                <option value="Neurologues">Neurologue</option>
                <option value="Orl">Orl</option>
                <option value="Orthopédiste">Orthopédiste</option>
                <option value="Ophtalmologue ">Ophtalmologue </option>
                <option value="Pédiatre">Pédiatre</option>
              </select>
            </div>
            <div>
                <label htmlFor='num'> number </label>
                <input type='text' id='num' value={itemsData.number}/>
            </div>
            <div>
                <label htmlFor='Experience'> Experience </label>
                <input type='number' id='Experience' value={itemsData.Experience}/>
            </div>
            <input type="submit" className='submit' value="Update"/>
        </form>
    </div>
  );
}

export default Docmod;