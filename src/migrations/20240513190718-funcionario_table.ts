import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('Funcionarios', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cargos',
          key: 'id'
        }
      },
      filial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Filiais',
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

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    // Desfaça a criação da tabela
    await queryInterface.dropTable('Funcionarios');
  }
};
