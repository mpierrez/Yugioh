'use_strict';

const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
	 	return db.Card.findAll()
	 		.then((cards) => res.json(cards))
	 		.catch((err) => next(err));
	 },

	get_by_id: (req, res, next) => {
	 	return db.Card.findByPk(req.params.card_id)
	 		.then((card) => {
	 			if (!card) {
	 				throw { status: 404, message: 'Requested card not found' };
				}
				return res.json(card);
			})
			.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			name: req.body.name || '...'
		};
		return db.Card.create(data)
			.then((card) => res.json(card))
			.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Card.findByPk(req.params.card_id)
			.then((card) => {
				if (!card) {
					throw { status: 404, message: 'Requested card not found' };
				}
				Object.assign(card, req.body);
				return card.save();
			})
			.then((card) => res.json(card))
			.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return db.Card.findByPk(req.params.card_id)
			.then((card) => {
				if (!card) {
					throw { status: 404, message: 'Requested card not found' };
				}
				return card.destroy();
			})
			.then(() => res.status(200).end())
			.catch((err) => next(err));
	}

};
