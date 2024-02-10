'use strict';

const card_ctrl = require('../controllers/card');

module.exports = [

	{
		url: '/cards/:card_id',
		method: 'put',
		func: card_ctrl.update_by_id
	},
	{
		url: '/cards/:card_id',
		method: 'delete',
		func: card_ctrl.delete_by_id
	}

];
