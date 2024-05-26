'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Funcionario', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            cargo_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Cargo',
                    key: 'id'
                }
            },
            filial_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Filial',
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
        await queryInterface.addConstraint('Funcionario', {
            fields: ['cargo_id'],
            type: 'foreign key',
            name: 'funcionario_cargo_id_fk',
            references: {
                table: 'Cargo',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        await queryInterface.addConstraint('Funcionario', {
            fields: ['filial_id'],
            type: 'foreign key',
            name: 'funcionario_filial_id_fk',
            references: {
                table: 'Filial',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Funcionario');
    }
};
