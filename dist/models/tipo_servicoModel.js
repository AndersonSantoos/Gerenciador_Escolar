"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const servicoModel_1 = __importDefault(require("./servicoModel"));
class Tipo_servico extends sequelize_1.Model {
}
Tipo_servico.init({
    tipo_servico_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    servico_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Servico',
            key: 'servico_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode ser vazio ' }
        }
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'tipo_servico'
});
Tipo_servico.belongsTo(servicoModel_1.default, { foreignKey: 'servico_id', as: 'servico' });
exports.default = Tipo_servico;
