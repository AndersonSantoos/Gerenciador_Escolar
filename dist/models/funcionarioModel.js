"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const cargoModel_1 = __importDefault(require("./cargoModel"));
const filial_1 = __importDefault(require("./filial"));
class Funcionario extends sequelize_1.Model {
}
Funcionario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cargo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: cargoModel_1.default,
            key: 'id',
        }
    },
    filial_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: filial_1.default,
            key: 'id',
        }
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'Funcionarios'
});
Funcionario.belongsTo(cargoModel_1.default, { foreignKey: 'cargo_id', as: 'cargo' });
Funcionario.belongsTo(filial_1.default, { foreignKey: 'filial_id', as: 'filial' });
exports.default = Funcionario;
