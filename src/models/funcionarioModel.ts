import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Cargo from './cargoModel';

class Funcionario extends Model {
    public funcionario_id!: number;
    public cargo_id!: number;
    public nome!: string;
    public senha!: string;
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
        cargo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cargo',
                key: 'cargo_id',
            }
        }, 
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
        tableName: 'Funcionarios'
    });

Funcionario.belongsTo(Cargo, { foreignKey: 'cargo_id', as: 'cargo' });

export default Funcionario;
