const { join } = require('path');

module.exports = {
	blockTemplatesPath: join(__dirname, 'templates'),
	defaultValues: {
		namespace: 'spaceblocks',
		category: 'spaceblocks',
	},
};