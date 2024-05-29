'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('Cargo', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      funcao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Campo não pode estar vazio' }
        }
      },
      isLeader: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Campo não pode estar vazio' }
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Campo não pode estar vazio.'}
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.dropTable('Cargo');
  }
};
