'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tipo_servico', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            setor_responsavel_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'SetorResponsavel',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            nome: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode ser vazio.' }
                }
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode ser vazio.' }
                }
            },
            prazo_resolucao: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Campo não pode estar vazio.' }
                }
            },
            prazo_minimo: {
                type: sequelize_1.DataTypes.INTEGER,
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
        await queryInterface.dropTable('Tipo_servico');
    }
};
