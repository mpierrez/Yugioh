import { Link } from 'react-router-dom';
import character from '../img/character.png';

function Home()
{
    return (
    <div className='homePage'>
        <div>
            <h2>Découvrez l&apos;univers du jeu de cartes Yu-Gi-Oh! à travers notre projet passionnant. Explorez des milliers de cartes, construisez des decks et partagez votre passion avec d&apos;autres duellistes. Plongez dans l&apos;action dès maintenant !</h2>
            <div>
                <Link to="/cards"><button className="BaseButtonHome">Afficher les cartes</button></Link>
                <Link to="/decks"><button className="BaseButtonHome">Fabriquer son deck</button></Link>
                <Link to="/boosters"><button className="BaseButtonHome">Ouvrir un booster</button></Link>
            </div>
        </div>
        <div className='triangle-rectangle'>
            <img src={character}></img>
        </div>
    </div>)
}

export default Home;