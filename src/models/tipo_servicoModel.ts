import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';
import SetorResponsavel from './setorResponsavelModel';

class Tipo_servico extends Model {
    public id!: number;
    public setor_responsavel_id!: number;
    public nome!: string;
    public status!: boolean;
    public prazo_resolucao!: number;
    public prazo_minimo!: number;
}

Tipo_servico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        setor_responsavel_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SetorResponsavel,
                key: 'id',
            }
        },
        nome: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Campo não pode ser vazio."}
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode ser vazio '}
            }
        },
        prazo_resolucao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 
        prazo_minimo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }, 

    }, {
        sequelize,
        tableName: 'tipo_servico'
});

Tipo_servico.belongsTo(SetorResponsavel, { foreignKey: 'id', as: 'setorResponsavel'});

export default Tipo_servico;