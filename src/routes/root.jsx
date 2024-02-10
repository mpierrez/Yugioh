import { Link, Outlet } from 'react-router-dom';
import logo from '../img/logo.png';

export default function Root() {
  document.title = 'Projet Yu-Gi-Oh'
  return (<>
    <header>
      <Link to="/"><h2><img src={logo} width='150' height='150'></img></h2></Link>
      <Link to="/cards"><h2 style={{color: 'white'}}>Cards</h2></Link>
      <Link to="/decks"><h2 style={{color: 'white'}}>Decks</h2></Link>
      <Link to="/boosters"><h2 style={{color: 'white'}}>Boosters</h2></Link>
      <Link to="/create"><h2 style={{color: 'white'}}>Create card</h2></Link>
    </header>
    <main>
      <Outlet />
    </main>
  </>
  );
}