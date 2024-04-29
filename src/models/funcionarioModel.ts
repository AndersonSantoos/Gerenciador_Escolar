import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Cargo from './cargoModel';

class Funcionario extends Model {
    public funcionario_id!: number;
    public nome!: string;
    public cargo_id!: number;
    public status!: string;
    public email!: string;
    public filial!: string;
}

Funcionario.init(
    {
        funcionario_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 
        cargo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 
        status: {
            type: DataTypes.ENUM('ativo', 'inativo'),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 
        filial: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        } 
    }, {
        sequelize,
        modelName: 'Funcionario',
        tableName: 'funcionarios'
    });

Funcionario.belongsTo(Cargo, { foreignKey: 'cargo_id', as: 'cargo' });

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo sincronizado com o banco de dados');
    } catch (error) {
        console.error('Erro ao sincronizar o modelo:', error);
    }
})();
