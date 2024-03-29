import { useLoaderData, useNavigation } from "react-router";
import { Form } from "react-router-dom";
import booster from "../img/booster.png"
import BoosterCard from "./boosterCard";
import * as api from "../api/api";
import { useState } from "react";
import sound from '../audio/open.mp3'

function Boosters()
{
    const data = useLoaderData();
    const cards = (data.cards == undefined ? [] : data.cards)
    let [clicked, setClicked] = useState(false)
    let [openBooster, setOpenBooster] = useState(false)
    let navigation = useNavigation();
    let isGenerating = navigation.state === 'loading' && navigation.location.pathname === '/boosters';
                  
    return (
      <>
        <div id="cards">
            <h1>Boosters</h1>
            <p id="cards-title" style={{fontSize: '2rem'}}>Bienvenue dans l&apos;univers des boosters Yu-Gi-Oh!</p>
            <p id="cards-description">Ici, vous avez l&apos;opportunité de découvrir de nouvelles cartes pour enrichir votre collection. Les boosters sont des paquets de cartes mystérieux qui renferment des trésors en monstres, magies et pièges. Ouvrez-les pour dévoiler les cartes qui peuvent améliorer votre deck. Chaque booster est une surprise, une chance de trouver des cartes rares et puissantes. Explorez cet espace pour élargir votre répertoire et renforcer votre arsenal dans le monde de Yu-Gi-Oh!</p>
            <Form>
                <button className="BaseButton" onClick={() => setOpenBooster(false)} disabled={isGenerating} height={100} width={200}>{isGenerating ? "Generating..." : "Generate a new booster"}</button>
                <br/>
            </Form>
            <nav>
              {!openBooster ? (
                <BoosterCard className="booster flipped" onClick={() => {
                  setOpenBooster(false)
                  if(!clicked)
                  {
                    setClicked(true)
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const audio = new Audio(sound);
                    const source = audioContext.createMediaElementSource(audio);
                    source.connect(audioContext.destination);
                    audio.play();
                    setTimeout(() => {
                      setOpenBooster(true)
                      setClicked(false)
                    }, 9300)
                  }
                }} card={booster} flip={true}/>
              ) : (
                <ul id="listCards" style={{marginTop: '30px'}}>
                {cards.map((card) => (
                    <BoosterCard key={card.id} card={card} flip={false}/>
                ))}
                </ul>
              )}
            </nav>
        </div>
      </>
    );
  }

export function loaderBooster() {
    return api.getRandomCard()
      .then(cards => ({ cards }));
}

export default Boosters;