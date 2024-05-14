'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Servico', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            filial_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Filial',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            tipo_servico_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tipo_servico',
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
            responsavel: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            titulo: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('Ativo', 'Inativo', 'Em andamento', 'Concluido', 'Cancelado', 'Pendente', 'Em espera'),
                allowNull: false
            },
            prazo_resolucao: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            prazo_proposto: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            data_finalizacao: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
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
        await queryInterface.dropTable('Servico');
    }
};
