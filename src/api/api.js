let prefix = 'http://localhost:4200';

export function getAllCards() {
    return fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    .then(response => {
        if (response.headers.get('Content-Type').startsWith('application/json'))
        {
          return response.json();
        }
    })
    .then(data => {
      return {
        cards: data.data
      };
    })
}

export function getCardByName(name, type) {
    console.log(type)
    if(name.includes(" ")){
        let url = (type == 'all') ? `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}` : `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${type}&fname=${name}`
        return fetch(url)
            .then(response => {
                if (response.headers.get('Content-Type').startsWith('application/json'))
                {
                    return response.json();
                }
            })
            .then(data => {
                return {
                    cards: data.data,
                    search: name
                };
            })
    }else{
        let url = (type == 'all') ? `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}%` : `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${type}&fname=${name}`
        return fetch(url)
            .then(response => {
                if (response.headers.get('Content-Type').startsWith('application/json'))
                {
                    return response.json();
                }
            })
            .then(data => {
                return {
                    cards: data.data,
                    search: name
                };
            })
    }
}

export function getCardById(id, type) {
    let url = (type == 'all') ? `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}` : `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&type=${type}`
    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
      return {
        cards: data.data,
        search: id
      };
    })
}

export function getRandomCard() {
    return fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    .then(response => {
        if (response.headers.get('Content-Type').startsWith('application/json'))
        {
          return response.json();
        }
    })
    .then(data => {
      return [data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)], data.data[Math.floor(Math.random() * data.data.length)]];
    })
}

export function getDecks() {
    return fetch(`${prefix}/decks`)
        .then(res => res.json());
}

export function createDeck(deck) {
    return fetch(`${prefix}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deck)
    })
        .then((res) => res.json());
}

export function getDeckById(deckId){
    const deckPromise = fetch(`http://localhost:4200/decks/${deckId}`).then(response => response.json())
    const cardsPromise = fetch(`http://localhost:4200/decks/${deckId}/cards`).then(response2 => response2.json())
    
    return Promise.all([deckPromise, cardsPromise]).then(([deckData, cardsData]) => {
        return {
            name: deckData.name,
            cards: cardsData,
            deckId: deckId
        };
    });
}

export function deleteDeckById(id){
    return fetch(`http://localhost:4200/decks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function createCard(id, data){
    return fetch(`http://localhost:4200/decks/${id}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export function deleteCard(cardId){
    return fetch(`http://localhost:4200/cards/${cardId}`, {
        method: "DELETE",
    });
}