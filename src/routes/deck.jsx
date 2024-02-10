import { Form, redirect, useFetcher, useLoaderData, useNavigation } from "react-router-dom";
import DeckCard from "./deckcard";
import * as api from '../api/api';
import { useState } from "react";

function Deck()
{
    const data = useLoaderData();
    const name = data.deckCards.name

    const allCards = data.allCards.cards
    const cards = data.deckCards.cards
    const [search, setSearch] = useState('');

    let filteredCards = allCards.filter(card =>
      card.name.toLowerCase().startsWith(search.toLowerCase())
    );

    const fetcher = useFetcher();
    let isAdding = fetcher.state === 'loading' || fetcher.state === 'submitting'

    let navigation = useNavigation()
    let loading = navigation === 'loading'

    const handleDeleteConfirmation = (event) => {
      if (!window.confirm('Etes-vous sûr de supprimer ce deck ?')) {
        event.preventDefault();
      }
    };

    return (
        <div style={{opacity: loading ? 0.5 : 1}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignCards: 'center', alignItems: 'center'}}>
            <h1>{name}</h1>
            <Form method="DELETE" onSubmit={handleDeleteConfirmation}>
              <button className="DeleteButton">Delete deck</button>
            </Form>
          </div>
          <hr/>
          <fetcher.Form method="POST" action="cards">
            <input id="name" name="name" placeholder="Entrez le nom d'une carte" type="text" onChange={(event) => setSearch(event.target.value)}/>
            {filteredCards.slice(0,5).map((card) => (
              <div key={card.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                <p>{card.name}</p>
                <button className="BaseButton" name="cardName" value={card.id + "_" + card.name} disabled={isAdding}>{isAdding ? 'Adding card...' : 'Add card'}</button>
              </div>
            ))}
          </fetcher.Form>

          <h2 style={{fontSize: '1.75rem'}}>Vos cartes dans ce deck</h2>
          <ul style={{padding:'0'}}>
            {fetcher.formData && fetcher.formAction.includes('cards') ? (
                <li key="creatingCard" style={{color: 'gray', fontStyle: 'italic'}}>Creating card {fetcher.formData.get('name')}...</li>
              ) : (<></>)
            }

            {cards.length > 0 ? (
              <li>
                {cards.map((card) => (
                    <DeckCard key={card.id} card={card}/>
                  ))}
              </li>
                  
            ) : (
              <p>Vous n&apos;avez aucune carte dans ce deck.</p>
            )}
          </ul>
        </div>
    )
}

export function loaderDeckId({ params }) {
    return Promise.all([api.getDeckById(params.deckId), api.getAllCards()]).then(([deckCardsData, allCardsData]) => {
      return {
          allCards: allCardsData,
          deckCards: deckCardsData
      };
  });
}

export function deleteDeck({ params }) {
    return api.deleteDeckById(params.deckId)
    .then(() => {
      return redirect("/decks")
    })
}

export default Deck