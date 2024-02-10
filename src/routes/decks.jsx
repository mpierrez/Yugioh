import { Outlet, Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import { NavLinkWithQuery } from "../linkWithQuery";
import * as api from "../api/api"
import { useState } from "react";
import deckImage from "../img/deck.png"

function Decks(){

  const data = useLoaderData()
  let decks = data.decks
  let navigation = useNavigation();
  let isCreating = navigation.state === 'loading' && navigation.location.pathname === '/decks';
  let [showDeck, setShowDeck] = useState(false);

  const handleClick = (event) => {
    setShowDeck(false)
    if(document.getElementById("name").value.trim() == "")
    {
      alert("Vous devez renseigner un nom pour créer un deck")
      event.preventDefault();
    }
  }

  return (
    <>
      <div id="cards">
        <h1>Decks</h1>
        <p style={{margin: '0.75rem 3rem 0rem 3rem', fontSize: '2rem'}}>Bienvenue dans l&apos;interface de création de deck Yu-Gi-Oh!</p>
        <p style={{margin: '1rem 3rem 1rem 3rem', textAlign: 'center'}}>Ici, vous avez le pouvoir de composer votre propre deck stratégique en sélectionnant et en personnalisant des cartes de monstre, de magie et de piège. Ajoutez, supprimez et perfectionnez votre deck pour créer une combinaison imbattable. Le succès repose sur le choix des cartes et la stratégie. Préparez-vous à relever tous les défis qui se présentent dans l&apos;univers de Yu-Gi-Oh!</p>
          <Form method="POST">
            <input placeholder="Entrez le nom du deck à créer" id="name" name="name" type="text" style={{marginRight: '0.5em', width: '270px'}}></input>
            <button className="BaseButton" disabled={isCreating} onClick={handleClick}>{isCreating ? "Being created..." : "Create Deck"}</button>
            <br/>
          </Form>  
  
          {decks.length > 0 ? (
          <nav>
              <ul id="listCards">
                {navigation.formData && navigation.formAction === '/decks' ? (
                    <li key="creating" style={{color: 'gray', fontStyle: 'italic'}}>Creating deck {navigation.formData.get('name')}...</li>
                  ) : (<></>)
                }

                {decks.map((deck) => (
                  <li key={deck.id} style={{display: 'flex', flexDirection: 'column', margin: 15}}>
                    <img style={{height: 150, width: 100}} src={deckImage}/>
                    <NavLinkWithQuery to={deck.id} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''} onClick={()=>setShowDeck(true)}>
                      {deck.name}
                    </NavLinkWithQuery>
                  </li>
                ))}
              </ul>
          </nav>
        ) : (
          <p>Aucun deck trouvé.</p>
        )}
      </div>
        {showDeck ?
            <div id="details">
                <Outlet/>
            </div> :
            <></>
        }
    </>
  );
}

export function loaderDeck() {
    return api.getDecks()
      .then(decks => ({ decks }));
}

export function actionDeck({ request }) {
  if(request.method == 'POST') {
    return request.formData()
    .then(formData => {
      const data = Object.fromEntries(formData);
      
      return api.createDeck(data)
      .then((data) => {
          document.getElementById('name').value = ''
          return redirect(`/decks/${data.id}`)
      })
    })
  }
}

export default Decks