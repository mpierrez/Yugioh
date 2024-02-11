import { Form, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import {useEffect, useState} from "react";
import { NavLinkWithQuery } from "../linkWithQuery";
import * as api from "../api/api"

function Cards() {
    const data = useLoaderData();
    const search = data.search
    const cards = (data.cards == undefined ? [] : data.cards)
    let navigation = useNavigation();
    let [showCard, setShowCard] = useState(false);
    let [searching, setSearching] = useState(false);
    let isSearching = navigation.state === 'loading' && navigation.location.pathname === '/cards';
  
    useEffect(() => { document.getElementById('search').value = search }, [search]);

    return (
      <>
        <div id="cards">
                <h1>Cards</h1>
                <Form>
                    <div id="search-container">
                        <input id="search" name="search" type="text" placeholder="Veuillez entrer un nom ou identifiant de carte"></input>
                        <button className="BaseButton" onClick={()=> {setShowCard(false); setSearching(true)}} disabled={isSearching}>{isSearching ? "Searching" : "Search"}</button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input type="radio" id="byName" name="filter" value="name" defaultChecked/>
                        <label htmlFor="byName">Rechercher par nom</label>

                        <input type="radio" id="byId" name="filter" value="id" />
                        <label htmlFor="byId">Rechercher par identifiant</label>
                    </div>
                    <br/>
                    <label htmlFor="type">Trier par type</label>
                    <select name="type" id="type">
                        <option value="all">All cards</option>
                        <option value="Skill Card">Skill Card</option>
                        <option value="Spell Card">Spell Card</option>
                        <option value="Trap Card">Trap Card</option>
                        <option value="Normal Monster">Normal Monster</option>
                        <option value="Normal Tuner Monster">Normal Tuner Monster</option>
                        <option value="Effect Monster">Effect Monster</option>
                        <option value="Tuner Monster">Tuner Monster</option>
                        <option value="Flip Monster">Flip Monster</option>
                        <option value="Flip Tuner Effect Monster">Flip Tuner Effect Monster</option>
                        <option value="Spirit Monster">Spirit Monster</option>
                        <option value="Union Effect Monster">Union Effect Monster</option>
                        <option value="Gemini Monster">Gemini Monster</option>
                        <option value="Pendulum Effect Monster">Pendulum Effect Monster</option>
                        <option value="Pendulum Normal Monster">Pendulum Normal Monster</option>
                        <option value="Pendulum Tuner Effect Monster">Pendulum Tuner Effect Monster</option>
                        <option value="Ritual Monster">Ritual Monster</option>
                        <option value="Ritual Effect Monster">Ritual Effect Monster</option>
                        <option value="Toon Monster">Toon Monster</option>
                        <option value="Fusion Monster">Fusion Monster</option>
                        <option value="Synchro Monster">Synchro Monster</option>
                        <option value="Synchro Tuner Monster">Synchro Tuner Monster</option>
                        <option value="Synchro Pendulum Effect Monster">Synchro Pendulum Effect Monster</option>
                        <option value="XYZ Monster">XYZ Monster</option>
                        <option value="XYZ Pendulum Effect Monster">XYZ Pendulum Effect Monster</option>
                        <option value="Link Monster">Link Monster</option>
                        <option value="Pendulum Flip Effect Monster">Pendulum Flip Effect Monster</option>
                        <option value="Pendulum Effect Fusion Monster">Pendulum Effect Fusion Monster</option>
                        <option value="Token">Token</option>
                    </select>
                    <br/>
                </Form>
                <div id="details-responsive" hidden={!showCard || !(window.matchMedia("(max-width: 400px)").matches)}>
                    <Outlet></Outlet>
                </div>
                {cards.length > 0 ? (
                    <nav>
                        <ul id="listCards">
                            {cards.map((card) => (
                                <li key={card.id}>
                                    <NavLinkWithQuery to={card.id} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : 'not-active'}>
                                        <img onClick={()=>{
                                                setShowCard(true)
                                                if(window.matchMedia("(max-width: 400px)").matches) {
                                                    document.getElementById('details-responsive').scrollIntoView({ behavior: 'smooth' })
                                                } else {
                                                    document.getElementById('details').scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }
                                        } src={card.card_images[0].image_url}/>
                                    </NavLinkWithQuery>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ) : (
                    <p>{searching ? "" : "Aucun résultat trouvé."}</p>
                )}
        </div>
        <div id="details" style={{ transform: 'translateY(-50%)' }} hidden={!showCard || (window.matchMedia("(max-width: 600px)").matches)}>
            <Outlet></Outlet>
        </div>
      </>
    );
  }

export function loaderCard({ params, request }) {
    let cardId = params.cardId
    if(cardId == undefined)
    {
        const url = new URL(request.url);
        const search = url.searchParams.get("search");
        const filter = url.searchParams.get("filter");
        const type = url.searchParams.get("type");

        if (!search) {
            return { cards: [], search: search }
        }

        if(filter == 'name'){
            return api.getCardByName(search, type)
        } else if(filter == 'id') {
            return api.getCardById(search, type)
        }
    
    } else {
        return api.getCardById(cardId, "all");
    }
}

export default Cards