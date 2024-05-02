import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Servico from './servicoModel';

class Tipo_servico extends Model {
    public tipo_servico_id!: number;
    public servico_id!: number;
    public tipo!: string;
}

Tipo_servico.init(
    {
        tipo_servico_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        servico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Servico,
                key: 'servico_id'
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

Tipo_servico.belongsTo(Servico, { foreignKey: 'servico_id', as: 'servico'});

export default Tipo_servico;