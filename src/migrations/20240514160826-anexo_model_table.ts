'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('Anexo', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      servico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Servico',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mensagem_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Mensagem',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Funcionario',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Anexo');
  }
};
