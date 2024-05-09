import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import Servico from './servicoModel';
import Mensagem from './mensagemModel';
import Funcionario from './funcionarioModel';

class Anexo extends Model {
    public id!: number;
    public servico_id!: number;
    public mensagem_id!: string;
    public funcionario_id!: number;
}

Anexo.init(
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
        mensagem_id: {
            type: DataTypes.UUID, 
            allowNull: false,
            references: {
                model: Mensagem,
                key: 'id' 
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },        
        funcionario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Funcionario,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize,
        tableName: 'Anexo'
});

Anexo.belongsTo(Servico, {foreignKey: 'id', as: 'servico'});
Anexo.belongsTo(Mensagem, {foreignKey: 'mensagem_id', as: 'mensagem'}); 
Anexo.belongsTo(Funcionario, {foreignKey: 'id', as: 'funcionario'});

export default Anexo;
