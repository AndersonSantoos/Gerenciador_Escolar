import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import { v4 as uuidv4 } from 'uuid';
import Servico from './servicoModel';

class Mensagem extends Model {
    public id!: string; // Alterando para string para UUID
    public servico_id!: number;
    public descricao!: string;
}

Mensagem.init(
    {
        id: {
            type: DataTypes.UUID, 
            defaultValue: () => uuidv4(), 
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
        tableName: 'Mensagem'
});

Mensagem.belongsTo(Servico, {foreignKey: 'servico_id', as: 'servico'}); // Corrigindo a chave estrangeira

export default Mensagem;
