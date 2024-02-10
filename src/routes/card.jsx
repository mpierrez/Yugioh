import { useLoaderData, useNavigation } from "react-router-dom";

function Card()
{
    let card = useLoaderData();
    card = card[0]
    let isMonster = card.type.toLowerCase().includes('monster');

    let navigation = useNavigation()
    let loading = navigation === 'loading'

    return (
        <div id="card" style={{opacity: loading ? 0.5 : 1}}>
          <h2 id="cardName">{card.name}</h2>
            <div id="cardSpec">
                <img width="150px" src={card.card_images[0].image_url}/>
                <div id="cardSpecPlus">
                    <p>{card.type}</p>
                    <p>{card.race}</p>
                    {isMonster ? <><div id="atkdef"><img style={{height:20}} src="https://i.ibb.co/x63Ry7k/epee.png"/><p>{card.atk}</p></div> <div id="atkdef"><img style={{height:20}} src="https://i.ibb.co/KmNGNcK/bouclier.png"/><p>{card.def}</p></div></> : <p></p>}
                </div>
            </div>
          <p id="cardDesc">{card.desc}</p>
            <div className="Prices">
                <div>
                    <img src="https://i.ibb.co/d5sXb9B/Cardmarket-Logo-Tagline-Blue-Vertical-V23042018.png" className="imgcardmarket"/><p className="priceP">{card.card_prices[0].cardmarket_price} €</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/syvHMxw/images-squarespace-cdn.png" className="imgcardmarket"/><p className="priceP">{card.card_prices[0].tcgplayer_price} $</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/sHy9Wrn/EBay-logo.png" className="imgcardmarket"/><p className="priceP">{card.card_prices[0].ebay_price} $</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/wrFtxsc/Amazon-icon-svg.png" className="imgcardmarket"/><p className="priceP">{card.card_prices[0].amazon_price} $</p>
                </div>
                <div>
                    <img src="https://i.ibb.co/9NfqNJy/csi-logo-hires-horizontal.png" className="imgcardmarket"/><p className="priceP">{card.card_prices[0].coolstuffinc_price} $</p>
                </div>
            </div>
        </div>
    )
}

export function loaderCardId({ params }) {
  let id = params.cardId

  if (!id) {
    return []
  }
  return fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=' + id + '&language=fr')
  .then(response => {
      if (response.ok) {
          return response.json();
      }
      // Si la version française n'est pas trouvée, charger la version anglaise
      return fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=' + id)
          .then(response => response.json());
  })
  .then(data => {
      return data.data
  })
}

export default Card