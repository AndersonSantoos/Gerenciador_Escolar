'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('Funcionario', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cargo',
          key: 'id'
        }
      },
      filial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Filial',
          key: 'id'
        }
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
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
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.dropTable('Funcionario');
  }
};
