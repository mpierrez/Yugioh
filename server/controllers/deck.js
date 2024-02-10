'use_strict';

const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Deck.findAll()
			.then((decks) => res.json(decks))
			.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return db.Deck.findByPk(req.params.deck_id)
			.then((deck) => {
				if (!deck) {
					throw { status: 404, message: 'Requested deck not found' };
				}
				return res.json(deck);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			name: req.body.name || '...'
		};
		return db.Deck.create(data)
			.then((deck) => res.json(deck))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Deck.findByPk(req.params.deck_id)
			.then((deck) => {
				if (!deck) {
					throw { status: 404, message: 'Requested deck not found' };
				}
				Object.assign(deck, req.body);
				return deck.save();
			})
			.then((deck) => res.json(deck))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Deck.findByPk(req.params.deck_id)
			.then((deck) => {
				if (!deck) {
					throw { status: 404, message: 'Requested deck not found' };
				}
				return deck.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	},

	get_cards_of_id: (req, res, next) => {
		return db.Deck.findByPk(req.params.deck_id)
			.then((deck) => {
				if (!deck) {
					throw { status: 404, message: 'Requested deck not found' };
				}
				return deck.getCards();
			})
			.then((items) => res.json(items))
			.catch((err) => next(err));
	},

	add_card_to_id: (req, res, next) => {
		return db.Deck.findByPk(req.params.deck_id)
			.then((deck) => {
				if (!deck) {
					throw { status: 404, message: 'Requested deck not found' };
				}
				const data = {
					name: req.body.name || 'Deck sans nom',
					yugiohId: req.body.yugiohId
				};
				return deck.createCard(data);
			})
			.then((item) => res.json(item))
			.catch((err) => next(err));
	}

};
