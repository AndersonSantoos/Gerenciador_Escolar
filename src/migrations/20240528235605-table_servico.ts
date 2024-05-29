'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('Servico', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      filial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Filial',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo_servico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tipo_servico',
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
      responsavel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Ativo', 'Inativo', 'Em andamento', 'Concluido', 'Cancelado', 'Pendente', 'Em espera'),
        allowNull: false
      },
      prazo_resolucao: {
        type: DataTypes.DATE,
        allowNull: false
      },
      prazo_proposto: {
        type: DataTypes.DATE,
        allowNull: true
      },
      data_finalizacao: {
        type: DataTypes.DATE,
        allowNull: true
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
    await queryInterface.dropTable('Servico');
  }
};
