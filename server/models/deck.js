const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Deck extends Sequelize.Model {
		static associate(db) {
			Deck.belongsToMany(db.Card, {through: 'DeckCards'});
		}
	}

	Deck.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Deck'
	});

	return Deck;

};
