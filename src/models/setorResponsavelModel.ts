import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/dbConfig';

class SetorResponsavel extends Model {
    public id!: number;
    public nome!: string;
}

SetorResponsavel.init(
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
                notEmpty: { msg: 'O campo não pode ser vazio.'}
            }
        },
    }, {
        sequelize,
        tableName: 'setor_responsavel'
    }
)

export default SetorResponsavel;