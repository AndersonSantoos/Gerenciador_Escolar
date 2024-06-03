"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCargoById = exports.updateCargoById = exports.getCargoById = exports.criarCargo = void 0;
const cargoModel_1 = __importDefault(require("../models/cargoModel"));
const criarCargo = async (funcao, isLeader, status) => {
    try {
        return await cargoModel_1.default.create({ funcao, isLeader, status });
    }
    catch (error) {
        console.error('Erro ao criar cargo');
        throw error;
    }
};
exports.criarCargo = criarCargo;
const getCargoById = async (id) => {
    const cargo = await cargoModel_1.default.findByPk(id);
    if (!cargo) {
        throw new Error('Cargo não encontrado.');
    }
    return cargo;
};
exports.getCargoById = getCargoById;
const updateCargoById = async (id, newData) => {
    try {
        const cargo = await cargoModel_1.default.findByPk(id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await cargoModel_1.default.update(newData, { where: { id: id } });
        const cargoAtualizado = await cargoModel_1.default.findByPk(id);
        return cargoAtualizado;
    }
    catch (error) {
        throw new Error('Erro na atualização do cargo por ID.');
    }
};
exports.updateCargoById = updateCargoById;
const deleteCargoById = async (id) => {
    try {
        const cargo = await cargoModel_1.default.findByPk(id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await cargo.destroy();
        return ('Cargo deletado com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o cargo pelo ID.');
    }
};
exports.deleteCargoById = deleteCargoById;
