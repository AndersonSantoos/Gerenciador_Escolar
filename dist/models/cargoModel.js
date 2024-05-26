"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
class Cargo extends sequelize_1.Model {
}
Cargo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    funcao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    isLeader: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio' }
        }
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Campo não pode estar vazio.' }
        }
    }
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'Cargo'
});
exports.default = Cargo;
