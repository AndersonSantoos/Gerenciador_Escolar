"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Anexo', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            servico_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Servico',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            mensagem_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Mensagem',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            funcionario_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Funcionario',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Anexo');
    }
};
