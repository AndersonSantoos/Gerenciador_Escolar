"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const funcionarioModel_1 = __importDefault(require("./funcionarioModel"));
class Servico extends sequelize_1.Model {
}
Servico.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio ' }
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio ' }
        }
    }
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'Servico'
});
Servico.belongsTo(funcionarioModel_1.default, { foreignKey: 'funcionario_id', as: 'funcionario' });
exports.default = Servico;
