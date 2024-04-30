"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCargoControllerById = exports.updateCargoControllerById = exports.getCargoControllerById = exports.criarCargoController = void 0;
const cargoRepository_1 = require("../repositories/cargoRepository");
const criarCargoController = async (req, res) => {
    const { funcao, isLeader } = req.body;
    try {
        const novoCargo = await (0, cargoRepository_1.criarCargo)(funcao, isLeader);
        res.status(201).json(novoCargo);
    }
    catch (error) {
        console.error('Erro ao criar cargo', error);
        res.status(500).json({ message: 'Erro ao criar cargo' });
    }
};
exports.criarCargoController = criarCargoController;
const getCargoControllerById = async (req, res) => {
    const { cargo_id } = req.params;
    try {
        const cargo = await (0, cargoRepository_1.getCargoById)(parseInt(cargo_id, 10));
        if (!cargo) {
            res.status(404).json({ message: 'Cargo não encontrado' });
        }
        else {
            res.status(200).json(cargo);
        }
    }
    catch (error) {
        console.error('Erro ao obter cargo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getCargoControllerById = getCargoControllerById;
const updateCargoControllerById = async (req, res) => {
    const { cargo_id } = req.params;
    const newData = req.body;
    try {
        const cargoAtualizado = await (0, cargoRepository_1.updateCargoById)(parseInt(cargo_id, 10), newData);
        res.status(200).json(cargoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar cargo por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar cargo por ID' });
    }
};
exports.updateCargoControllerById = updateCargoControllerById;
const deleteCargoControllerById = async (req, res) => {
    const { cargo_id } = req.params;
    try {
        await (0, cargoRepository_1.deleteCargoById)(parseInt(cargo_id, 10));
        res.status(204).send();
    }
    catch (error) {
        console.error('Erro ao excluir cargo por ID', error);
        res.status(500).json({ message: 'Erro ao excluir cargo por ID' });
    }
};
exports.deleteCargoControllerById = deleteCargoControllerById;
