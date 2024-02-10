import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import './index.css';

import Root from './routes/root';
import Error from './error';
import Cards, { loaderCard } from './routes/cards';
import Card, { loaderCardId } from './routes/card';
import Deck, { loaderDeckId, deleteDeck } from './routes/deck';
import Decks, { actionDeck, loaderDeck } from './routes/decks';
import { actionCard } from './routes/deckcard';
import Home from './routes/home';
import Boosters, { loaderBooster } from './routes/boosters';
import CardMaker from './routes/cardMaker';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'home',
        errorElement: <Error/>,
        element: <Home/>
      },
      {
        path: 'cards',
        loader: loaderCard,
        action: actionCard,
        errorElement: <Error/>,
        element: <Cards/>,
        children: [
          {
            index: true,
            element: <></>
          },
          {
            path: ":cardId",
            loader: loaderCardId,
            element: <Card/>
          }
        ]
      },
      {
        path: 'decks',
        loader: loaderDeck,
        action: actionDeck,
        errorElement: <Error/>,
        element: <Decks/>,
        children: [
          {
            index: true,
            element: <p>Chargement du deck en cours...</p>
          },
          {
            path: ':deckId',
            loader: loaderDeckId,
            action: deleteDeck,
            element: <Deck/>,
            children: [
              {
                path: 'cards',
                action: actionCard
              }
            ]
          }
        ]
      },
      {
        path: 'boosters',
        errorElement: <Error/>,
        element: <Boosters/>,
        loader: loaderBooster
      },
      {
        path: 'create',
        errorElement: <Error/>,
        element: <CardMaker/>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/home" />
  }
], {
  future: {
    v7_normalizeFormMethod: true,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);