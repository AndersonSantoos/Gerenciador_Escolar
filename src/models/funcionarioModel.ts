import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Cargo from './cargoModel';
import Filial from './filial'

class Funcionario extends Model {
    public id!: number;
    public cargo_id!: number;
    public nome!: string;
    public senha!: string;
    public status!: string;
    public email!: string;
    public filial!: string;
}

Funcionario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cargo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cargo,
                key: 'id',
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
            type: DataTypes.BOOLEAN,
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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Filial,
                key: 'id',
            }
        }, 
    }, {
        sequelize,
        tableName: 'Funcionarios'
    });

Funcionario.belongsTo(Cargo, { foreignKey: 'cargo_id', as: 'cargo' });

export default Funcionario;
