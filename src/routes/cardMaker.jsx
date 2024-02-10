import { useState, useEffect, useRef } from 'react';
import linkCard from "../img/linkCard.png";
import effectCard from "../img/effectCard.png";
import spellCard from "../img/spellCard.png";
import xyzCard from "../img/xyzCard.png";
import normalCard from "../img/normalCard.png";
import fusionCard from "../img/fusionCard.png";
import ritualCard from "../img/ritualCard.png";
import trapCard from "../img/trapCard.png";
import synchroCard from "../img/synchroCard.png";
import darksynchroCard from "../img/darksynchroCard.png";
import legendaryDragonCard from "../img/legendarydragonCard.png";
import tokenCard from "../img/tokenCard.png";
import obeliskCard from "../img/obeliskCard.png";
import silferCard from "../img/silferCard.png";
import '../css/index.css';
import { Input } from '@chakra-ui/react';

function CardMaker() {
  const [cardInfo, setCardInfo] = useState({
    name: '',
    monsterType: '',
    effect: '',
    effect2: '',
    attack: '',
    defense: '',
  });

  const [type, setType] = useState('link');
  const [rarity, setRarity] = useState("common");

  const [selectedImage, setSelectedImage] = useState(null);

  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Efface le canvas à chaque mise à jour
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine l'image de fond
    const background = new Image();
    background.src = spellCard;
    switch (type) {
      case 'link':
        background.src = linkCard
        break;
      case 'effect':
        background.src = effectCard
        break;
      case 'spell':
        background.src = spellCard
        break;
      case 'xyz':
        background.src = xyzCard
        break;
      case 'normal':
        background.src = normalCard
        break;
      case 'fusion':
        background.src = fusionCard
        break;
      case 'ritual':
        background.src = ritualCard
        break;
      case 'trap':
        background.src = trapCard
        break;
      case 'synchro':
        background.src = synchroCard
        break;
      case 'dark-synchro':
        background.src = darksynchroCard
        break;
        case 'legendary-dragon':
        background.src = legendaryDragonCard
        break;
      case 'token':
        background.src = tokenCard
        break;
      case 'obelisk':
        background.src = obeliskCard
        break;
      case 'silfer':
        background.src = silferCard
        break;
    }
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      // Dessine l'image sélectionnée par-dessus
      if (selectedImage) {
        context.drawImage(selectedImage, 69, 150, 417, 419);
      }

      // Dessine l'aperçu de la carte avec les valeurs actuelles
      console.log(rarity)
      switch (rarity) {
        case 'common':
          context.fillStyle = '#ffffff';
          break;
        case 'silver':
          context.fillStyle = "#A2A2A0"
          break;
        case 'gold':
          context.fillStyle = '#DED39C';
          break;          
      }
      context.font = '64px Matrix Regular Small Caps, Arial';
      context.fillText(cardInfo.name, 40, 75);
      context.font = '24px Arial Bold';
      context.fillStyle = '#000';
      context.fillText("[" + cardInfo.monsterType + "]", 45, 640);
      context.font = '18px Matrix Regular Small Caps, Arial';
      if(cardInfo.effect.length >= 80)
      {
        context.fillText(cardInfo.effect.substring(0, 80), 45, 660);
        context.fillText(cardInfo.effect.substring(80, cardInfo.effect.length), 45, 675);
      } else {
        context.fillText(cardInfo.effect, 45, 660);
      }
      context.font = '24px Matrix Regular Small Caps, Arial';
      context.fillText("ATK / " + cardInfo.attack, 325, 750);
      context.fillText("DEF / " + cardInfo.defense, 425, 750);
    };
  }, [cardInfo, selectedImage, type, rarity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setSelectedImage(img);
        };
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null); // Réinitialise l'image sélectionnée
    }
  };

  return (
    <div id="cards">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} width="100%">
        <h1>Création de cartes</h1>
        <p style={{margin: '0.75rem 3rem 0rem 3rem', fontSize: '2rem'}}>Bienvenue dans l&apos;interface de création de cartes Yu-Gi-Oh!</p>
        <p style={{margin: '1rem 3rem 1rem 3rem', textAlign: 'center'}}>Ici, vous avez l&apos;opportunité unique de concevoir vos propres cartes, ajoutant une dimension personnelle à votre collection. Explorez cette plateforme intuitive qui vous permet de personnaliser chaque détail de vos cartes, des caractéristiques aux illustrations. Concevez des créations uniques qui reflètent votre style de jeu et partagez-les avec la communauté Yu-Gi-Oh! Téléchargez vos cartes personnalisées et offrez une nouvelle dimension à vos duels dans le monde palpitant de Yu-Gi-Oh!</p>
      </div>
      <br/>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        <form style={{marginLeft: '40px', marginRight: '40px'}} className='chakra-form'>
          <label>Nom: <Input type="text" name="name" value={cardInfo.name} onChange={handleChange}/></label>
          <br/>
          <label>Card type: <select id="type" onChange={() => {setType(document.getElementById("type").value)}}>
            <option value="link">Link</option>
            <option value="effect">Effect</option>
            <option value="spell">Spell</option>
            <option value="xyz">Xyz</option>
            <option value="normal">Normal</option>
            <option value="fusion">Fusion</option>
            <option value="ritual">Ritual</option>
            <option value="trap">Trap</option>
            <option value="synchro">Synchro</option>
            <option value="dark-synchro">Dark Synchro</option>
            <option value="legendary-dragon">Legendary Dragon</option>
            <option value="token">Token</option>
            <option value="obelisk">Obelisk</option>
            <option value="slifer">Slifer</option>
          </select></label>
          <br/>
          <label>Rarity: <select id="rarity" onChange={() => {setRarity(document.getElementById("rarity").value)}}>
            <option value="common">Common</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select></label>
          <br/>
          <label>
            Monster Type: <Input type="text" name="monsterType" value={cardInfo.monsterType} onChange={handleChange} />
          </label>
          <br />
          <label>
            Effect: <Input type="text" name="effect" value={cardInfo.effect} onChange={handleChange} />
          </label>
          <br />
          <label>
            Attack: <Input type="number" name="attack" value={cardInfo.attack} onChange={handleChange} />
          </label>
          <label>
            Defense: <Input type="number" name="defense" value={cardInfo.defense} onChange={handleChange} />
          </label>
          <br />
          <label>
            Background image: <Input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef} />
          </label>
        </form>
        <canvas ref={canvasRef} width={555} height={810} style={{ border: '1px solid #000' }} />
      </div>
    </div>
  );
}

export default CardMaker;
