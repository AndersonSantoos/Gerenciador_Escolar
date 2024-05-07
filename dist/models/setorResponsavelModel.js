"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
class SetorResponsavel extends sequelize_1.Model {
}
SetorResponsavel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O campo não pode ser vazio.' }
        }
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'setor_responsavel'
});
exports.default = SetorResponsavel;
