"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const setorResponsavelModel_1 = __importDefault(require("./setorResponsavelModel"));
class Tipo_servico extends sequelize_1.Model {
}
Tipo_servico.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    setor_responsavel_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: setorResponsavelModel_1.default,
            key: 'id',
        }
    },
    nome: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Campo não pode ser vazio." }
        }
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode ser vazio ' }
        }
    },
    prazo_resolucao: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    prazo_minimo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'tipo_servico'
});
Tipo_servico.belongsTo(setorResponsavelModel_1.default, { foreignKey: 'id', as: 'setorResponsavel' });
exports.default = Tipo_servico;
