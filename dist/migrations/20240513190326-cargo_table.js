'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cargo', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            funcao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode estar vazio' }
                }
            },
            isLeader: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode estar vazio' }
                }
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode estar vazio.' }
                }
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Cargo');
    }
};
