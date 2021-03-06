'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Engineers', // name of Source model
            'project_id', // name of the key we're adding 
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Projects', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Engineers', // name of Source model
            'project_id' // key we want to remove
        );
    }
};
