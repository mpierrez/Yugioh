import PropTypes from "prop-types";
import { useState } from "react";
import cardBack from "../img/cardBack.jpg"
import booster from "../img/booster.png"
import "../css/card.css";

BoosterCard.propTypes = {
  onClick: PropTypes.object,
  card: PropTypes.object,
  flip: PropTypes.object,
};

function BoosterCard({ onClick, card, flip }) {
    const [isFlipped, setIsFlipped] = useState(flip);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className={`${flip ? "booster" : "card"} ${isFlipped ? "flipped" : ""}`} onClick={() => {
        if(flip){
          onClick()
        }
        handleFlip()
        
      }}>
        <div className="card-inner">
          <div className="card-front">
            {flip ? (
              <img
                src={isFlipped ? booster : booster}
                alt="Booster Front"
              />
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                <img
                  src={isFlipped ? card.card_images[0].image_url : cardBack}
                  alt="Card Front"
                />
                {isFlipped ? (
                  <button className="BaseButton" onClick={(e) => {
                    e.preventDefault()
                    navigator.clipboard.writeText("J'ai obtenu la carte " + card.name + " lors de mon ouverture de booster!")
                  }}>Partager</button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <div className="card-back">
            <img src={cardBack} alt="Card Back" />
          </div>
        </div>
      </div>
    );
  }
  

export default BoosterCard;
