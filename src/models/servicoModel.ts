import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/dbConfig';
import Funcionario from './funcionarioModel';
import FilialServico from './filialServico';
import Tipo_servico from "./tipo_servicoModel";

class Servico extends Model {
    public id!: number;
    public filialServico_id!: number;
    public tipo_servico_id!: number;
    public funcionario_id!: number;
    public responsavel!: string;
    public titulo!: string;
    public status!: string;
    public prazo_resolucao!: Date;
    public prazo_proposto!: Date | null;
    public data_finalizacao!: Date | null;
}

Servico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filialServico_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: FilialServico,
                key: 'id',
            }
        },
        tipo_servico_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tipo_servico,
                key: 'id',
            }
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
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
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
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        prazo_proposto: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: { msg: 'Deve ser uma data válida' }
            }
        },
        data_finalizacao: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'Servico',
        hooks: {
            beforeSave: async (servico: Servico) => {
                // Aqui você pode adicionar lógica de pré-processamento antes de salvar o serviço, se necessário
            }
        }
});

export default Servico;
