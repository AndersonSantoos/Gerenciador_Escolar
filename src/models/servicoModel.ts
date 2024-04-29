import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/dbConfig';
import Funcionario from './funcionarioModel';

class Servico extends Model {
    public servico_id!: number;
    public funcionario_id!: number;
    public titulo!: string;
    public status!: string;
    public prazo_resolucao!: Date;
}

Servico.init(
    {
        servico_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        funcionario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Funcionario',
                key: 'funcionario_id'
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
                'Concluído', 'Cancelado', 'Pendente', 'Em espera'
            ),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        prazo_resolucao: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Servico'
});

Servico.belongsTo(Funcionario, { foreignKey: 'funcionario_id', as: 'funcionario'});

export default Servico;
