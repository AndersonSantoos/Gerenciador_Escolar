"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const funcionarioModel_1 = __importDefault(require("./funcionarioModel"));
const filial_1 = __importDefault(require("./filial"));
const tipo_servicoModel_1 = __importDefault(require("./tipo_servicoModel"));
class Servico extends sequelize_1.Model {
    async calcularPrazoResolucao() {
        const dataAbertura = new Date();
        const tipoServico = await tipo_servicoModel_1.default.findByPk(this.tipo_servico_id);
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
    async somarDataPretendidaComPrazo(dataPretendida) {
        const tipoServico = await tipo_servicoModel_1.default.findByPk(this.tipo_servico_id);
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
        }
        else {
            return null;
        }
    }
}
Servico.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filial_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: filial_1.default,
            key: 'id',
        }
    },
    tipo_servico_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipo_servicoModel_1.default,
            key: 'id',
        }
    },
    funcionario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: funcionarioModel_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    responsavel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Ativo', 'Inativo', 'Em andamento', 'Concluido', 'Cancelado', 'Pendente', 'Em espera'),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    prazo_resolucao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    prazo_proposto: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'Deve ser uma data válida' }
        }
    },
    data_finalizacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'Servico',
    hooks: {
        beforeSave: async (servico) => {
            if (servico.changed('tipo_servico_id')) {
                servico.prazo_resolucao = await servico.calcularPrazoResolucao();
            }
        }
    }
});
Servico.belongsTo(funcionarioModel_1.default, { foreignKey: 'funcionario_id', as: 'funcionario' });
Servico.belongsTo(filial_1.default, { foreignKey: 'filial_id', as: 'filial' });
Servico.belongsTo(tipo_servicoModel_1.default, { foreignKey: 'tipo_servico_id', as: 'tipo_servico' });
exports.default = Servico;
