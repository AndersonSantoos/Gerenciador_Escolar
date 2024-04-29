"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const cargoModel_1 = __importDefault(require("./cargoModel"));
class Funcionario extends sequelize_1.Model {
}
Funcionario.init({
    funcionario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    cargo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ativo', 'inativo'),
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
    filial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    }
}, {
    sequelize: dbConfig_1.sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionarios'
});
Funcionario.belongsTo(cargoModel_1.default, { foreignKey: 'cargo_id', as: 'cargo' });
(async () => {
    try {
        await dbConfig_1.sequelize.sync();
        console.log('Modelo sincronizado com o banco de dados');
    }
    catch (error) {
        console.error('Erro ao sincronizar o modelo:', error);
    }
})();
