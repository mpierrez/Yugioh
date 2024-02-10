import PropTypes from "prop-types";
import { Link, useFetcher } from "react-router-dom";
import * as api from '../api/api';

DeckCard.propTypes = {
    card: PropTypes.object
};

function DeckCard(props)
{
    const { card } = props;
    const fetcher = useFetcher()
    const pathToCard = "/cards/" + card.yugiohId + "?type=all"
    let isRemoving = fetcher.state === 'loading' || fetcher.state === 'submitting'
    return (
        <div className="DeckCard">
            <div style={{display:'flex'}}>
                <li key={card.id} style={{marginRight: '0.5em'}}>{card.name}</li>
                <Link to={pathToCard} style={{marginRight: '0.5em'}}><i className="fa fa-eye"></i></Link>
            </div>
            <div>
                <fetcher.Form method="DELETE" action="cards">
                    <button disabled={isRemoving} className="DeleteCardDeckButton" name="cardId" value={card.id}><i className="fa fa-close" style={{marginRight:'4px'}}></i>{isRemoving ? "Removing..." : ""}</button>
                </fetcher.Form>
            </div>
        </div>
    )
}

export function actionCard({ params, request }) {

    if(request.method == 'POST')
    {
        const deckId = params.deckId
        return request.formData()
          .then(response => {
            let data = Object.fromEntries(response);
            let params = data.cardName.split("_")
            let yugiohId = params[0]
            let cardName = params[1]
            return api.createCard(deckId, {yugiohId: yugiohId, name: cardName})
            .then(() => {return document.getElementById("name").value = ''})
        })
    } else if(request.method == 'DELETE') {
        return request.formData()
            .then(response => {
                const data = Object.fromEntries(response);
                return api.deleteCard(data.cardId)
            })
    } else {
        return null
    }
    
}

export default DeckCard;