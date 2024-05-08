"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const funcionarioModel_1 = __importDefault(require("./funcionarioModel"));
const filialServico_1 = __importDefault(require("./filialServico"));
const tipo_servicoModel_1 = __importDefault(require("./tipo_servicoModel"));
class Servico extends sequelize_1.Model {
}
Servico.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filialServico_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: filialServico_1.default,
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
            // Aqui você pode adicionar lógica de pré-processamento antes de salvar o serviço, se necessário
        }
    }
});
exports.default = Servico;
