'use strict';

const deck_ctrl = require('../controllers/deck');

module.exports = [

	{
		url: '/decks',
		method: 'get',
		func: deck_ctrl.get_all
	},
	{
		url: '/decks',
		method: 'post',
		func: deck_ctrl.create
	},
	{
		url: '/decks/:deck_id',
		method: 'get',
		func: deck_ctrl.get_by_id
	},
	{
		url: '/decks/:deck_id',
		method: 'put',
		func: deck_ctrl.update_by_id
	},
	{
		url: '/decks/:deck_id',
		method: 'delete',
		func: deck_ctrl.delete_by_id
	},
	{
		url: '/decks/:deck_id/cards',
		method: 'get',
		func: deck_ctrl.get_cards_of_id
	},
	{
		url: '/decks/:deck_id/cards',
		method: 'post',
		func: deck_ctrl.add_card_to_id
	},

];
