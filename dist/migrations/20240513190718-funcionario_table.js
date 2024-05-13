"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Funcionarios', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            cargo_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Cargos',
                    key: 'id'
                }
            },
            filial_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Filiais',
                    key: 'id'
                }
            },
            nome: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
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
        // Adicione as chaves estrangeiras
        await queryInterface.addConstraint('Funcionarios', {
            fields: ['cargo_id'],
            type: 'foreign key',
            name: 'funcionarios_cargo_id_fk',
            references: {
                table: 'Cargos',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        await queryInterface.addConstraint('Funcionarios', {
            fields: ['filial_id'],
            type: 'foreign key',
            name: 'funcionarios_filial_id_fk',
            references: {
                table: 'Filiais',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },
    down: async (queryInterface, Sequelize) => {
        // Desfaça a criação da tabela
        await queryInterface.dropTable('Funcionarios');
    }
};
