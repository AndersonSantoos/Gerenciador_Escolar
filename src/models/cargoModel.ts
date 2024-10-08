import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';

class Cargo extends Model {
    public id!: number;
    public funcao!: string;
    public isLeader!: boolean;
    public status!: boolean;
}

Cargo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        }
    }, {
        sequelize,
        tableName: 'Cargo'
});

export default Cargo;