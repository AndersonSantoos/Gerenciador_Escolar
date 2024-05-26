import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';

class Filial extends Model {
    public id!: number;
    public nome!: string;
}

Filial.init(
    {
        id: {
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
    }, {
        sequelize,
        tableName: 'Filial'
    }
)

export default Filial;