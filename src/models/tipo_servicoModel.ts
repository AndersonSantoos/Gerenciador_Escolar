import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Servico from './servicoModel';

class Tipo_servico extends Model {
    public id!: number;
    public servico_id!: number;
    public tipo!: string;
}

Tipo_servico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        servico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Servico,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode ser vazio '}
            }
        },
    }, {
        sequelize,
        tableName: 'tipo_servico'
});

Tipo_servico.belongsTo(Servico, { foreignKey: 'id', as: 'servico'});

export default Tipo_servico;