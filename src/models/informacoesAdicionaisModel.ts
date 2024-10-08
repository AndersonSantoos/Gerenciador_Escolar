import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Servico from './servicoModel';

class informacoesAdicionais extends Model {
    public id!: number;
    public servico_id!: number;
    public descricao!: string;
}

informacoesAdicionais.init(
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
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode ser vazio'}
            }
        },
    }, {
        sequelize,
        tableName: 'info_adicionais'
});

informacoesAdicionais.belongsTo(Servico, {foreignKey: 'id', as: 'servico'});

export default informacoesAdicionais;