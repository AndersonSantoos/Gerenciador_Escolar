import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from '../database/dbConfig';
import Funcionario from './funcionarioModel';
import Filial from './filial';
import Tipo_servico from "./tipo_servicoModel";

class Servico extends Model {
    public id!: number;
    public filial_id!: number;
    public tipo_servico_id!: number;
    public funcionario_id!: number;
    public responsavel!: string;
    public titulo!: string;
    public status!: string;
    public prazo_resolucao!: Date;
    public prazo_proposto!: Date | null;
    public data_finalizacao!: Date | null;

    public async calcularPrazoResolucao(): Promise<Date> {
        const dataAbertura = new Date();
        const tipoServico = await Tipo_servico.findByPk(this.tipo_servico_id);
        if (!tipoServico) {
            throw new Error('Tipo de serviço não encontrado');
        }
        const prazoMinimo = tipoServico.getDataValue('prazo_minimo');
        const prazoTipoServico = tipoServico.getDataValue('prazo');
        const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;

        // Calcula o prazo mínimo
        const dataPrazoMinimo = new Date(dataAbertura.getTime() + prazoMinimo * 24 * 60 * 60 * 1000);
        if (dataAbertura > dataPrazoMinimo) {
            throw new Error('Prazo mínimo não respeitado');
        }

        return new Date(dataAbertura.getTime() + prazoMilissegundos);
    }

    public async somarDataPretendidaComPrazo(dataPretendida: Date): Promise<Date | null> {
        const tipoServico = await Tipo_servico.findByPk(this.tipo_servico_id);
        if (!tipoServico) {
            throw new Error('Tipo de serviço não encontrado');
        }
        const prazoTipoServico = tipoServico.getDataValue('prazo');
        const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;
        const dataPretendidaMilissegundos = dataPretendida.getTime();
        const dataLimiteMilissegundos = this.prazo_resolucao.getTime();
        const novaDataMilissegundos = dataPretendidaMilissegundos + prazoMilissegundos;

        if (novaDataMilissegundos <= dataLimiteMilissegundos) {
            return new Date(novaDataMilissegundos);
        } else {
            return null;
        }
    }
}

Servico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filial_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Filial,
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
                if (servico.changed('tipo_servico_id')) {
                    servico.prazo_resolucao = await servico.calcularPrazoResolucao();
                }
            }
        }
});

Servico.belongsTo(Funcionario, { foreignKey: 'funcionario_id', as: 'funcionario'});
Servico.belongsTo(Filial, { foreignKey: 'filial_id', as: 'filial'});
Servico.belongsTo(Tipo_servico, { foreignKey: 'tipo_servico_id', as: 'tipo_servico'});

export default Servico;
