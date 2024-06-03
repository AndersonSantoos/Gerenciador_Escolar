"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSetorResponsavelControllerById = exports.updateSetorResponsavelControllerById = exports.getSetorResponsavelControllerById = exports.criarSetorResponsavelController = void 0;
const setorResponsavelRepository_1 = require("../repositories/setorResponsavelRepository");
const criarSetorResponsavelController = async (req, res) => {
    const { nome } = req.body;
    try {
        const novoSetorResponsavel = await (0, setorResponsavelRepository_1.criarSetorResponsavel)(nome);
        res.status(201).json(novoSetorResponsavel);
    }
    catch (error) {
        console.error('Erro ao criar setor responsável', error);
        res.status(500).json({ message: 'Erro ao criar setor responsável' });
    }
};
exports.criarSetorResponsavelController = criarSetorResponsavelController;
const getSetorResponsavelControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const setorResponsavel = await (0, setorResponsavelRepository_1.getSetorResponsavelById)(parseInt(id, 10));
        if (!setorResponsavel) {
            res.status(404).json({ message: 'Setor responsável não encontrado' });
        }
        else {
            res.status(200).json(setorResponsavel);
        }
    }
    catch (error) {
        console.error('Erro ao obter setor responsável por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getSetorResponsavelControllerById = getSetorResponsavelControllerById;
const updateSetorResponsavelControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const setorResponsavelAtualizado = await (0, setorResponsavelRepository_1.updateSetorResponsavelById)(parseInt(id, 10), newData);
        res.status(200).json(setorResponsavelAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar setor responsável por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar setor responsável por ID' });
    }
};
exports.updateSetorResponsavelControllerById = updateSetorResponsavelControllerById;
const deleteSetorResponsavelControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, setorResponsavelRepository_1.deleteSetorResponsavelById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao excluir setor responsável por ID', error);
        res.status(500).json({ message: 'Erro ao excluir setor responsável por ID' });
    }
};
exports.deleteSetorResponsavelControllerById = deleteSetorResponsavelControllerById;
