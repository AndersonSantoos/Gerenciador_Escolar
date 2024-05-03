import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Servico from './servicoModel';
import Mensagem from './mensagemModel';

class Anexo extends Model {
    public anexo_id!: number;
    public servico_id!: number;
    public mensagem!: number;
}

Anexo.init(
    {
        anexo_id: {
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
        mensagem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Mensagem',
                key: 'mensagem_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize,
        tableName: 'Anexo'
});

Anexo.belongsTo(Servico, {foreignKey: 'servico_id', as: 'servico'});
Anexo.belongsTo(Mensagem, {foreignKey: 'mensagem_id', as: 'mensagem'});

export default Anexo;