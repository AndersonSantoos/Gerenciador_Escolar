import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/dbConfig';
import Funcionario from './funcionarioModel';

class Servico extends Model {
    public id!: number;
    public funcionario_id!: number;
    public titulo!: string;
    public status!: string;
    public prazo_resolucao!: Date;
}

Servico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio '}
            }
        },
        status: {
            type: DataTypes.ENUM('Ativo', 'Inativo', 'Em andamento', 
                'Concluido', 'Cancelado', 'Pendente', 'Em espera'
            ),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        prazo_resolucao: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio '}
            }
        }
    }, {
        sequelize,
        tableName: 'Servico'
});

Servico.belongsTo(Funcionario, { foreignKey: 'id', as: 'funcionario'});

export default Servico;
