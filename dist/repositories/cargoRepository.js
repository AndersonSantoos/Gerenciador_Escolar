"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCargoById = exports.updateCargoById = exports.getCargoById = exports.criarCargo = void 0;
const cargoModel_1 = __importDefault(require("../models/cargoModel"));
const criarCargo = async (funcao, isLeader) => {
    try {
        return await cargoModel_1.default.create({ funcao, isLeader });
    }
    catch (error) {
        console.error('Erro ao criar cargo');
        throw error;
    }
};
exports.criarCargo = criarCargo;
const getCargoById = async (cargo_id) => {
    const cargo = await cargoModel_1.default.findByPk(cargo_id);
    if (!cargo) {
        throw new Error('Cargo não encontrado.');
    }
    return cargo;
};
exports.getCargoById = getCargoById;
const updateCargoById = async (cargo_id, newData) => {
    try {
        const cargo = await cargoModel_1.default.findByPk(cargo_id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await cargoModel_1.default.update(newData, { where: { cargo_id: cargo_id } });
        const cargoAtualizado = await cargoModel_1.default.findByPk(cargo_id);
        return cargoAtualizado;
    }
    catch (error) {
        throw new Error('Erro na atualização do cargo por ID.');
    }
};
exports.updateCargoById = updateCargoById;
const deleteCargoById = async (cargo_id) => {
    try {
        const cargo = await cargoModel_1.default.findByPk(cargo_id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        const cargoDeletado = await cargo.destroy();
        return (cargoDeletado);
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o cargo pelo ID.');
    }
};
exports.deleteCargoById = deleteCargoById;
