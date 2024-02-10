const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Card extends Sequelize.Model {
		static associate(db) {
			Card.belongsToMany(db.Deck, {through: 'DeckCards'});
		}
	}

	Card.init({
		yugiohId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Card'
	});

	return Card;

};