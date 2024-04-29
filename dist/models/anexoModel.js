"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const servicoModel_1 = __importDefault(require("./servicoModel"));
const mensagemModel_1 = __importDefault(require("./mensagemModel"));
class Anexo extends sequelize_1.Model {
}
Anexo.init({
    anexo_id: {
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
    mensagem_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Mensagem',
            key: 'mensagem_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'Anexo'
});
Anexo.belongsTo(servicoModel_1.default, { foreignKey: 'servico_id', as: 'servico' });
Anexo.belongsTo(mensagemModel_1.default, { foreignKey: 'mensagem_id', as: 'mensagem' });
exports.default = Anexo;
