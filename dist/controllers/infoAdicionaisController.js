"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInfoAdicionaisControllerById = exports.updateInfoAdicionaisControllerById = exports.getInfoAdicionaisControllerById = exports.criarInfoAdicionaisController = void 0;
const infoAdicionaisRepository_1 = require("../repositories/infoAdicionaisRepository");
const criarInfoAdicionaisController = async (req, res) => {
    const { servico_id, descricao } = req.body;
    try {
        const infoAdicionais = await (0, infoAdicionaisRepository_1.criarInfoAdicionais)(servico_id, descricao);
        res.status(201).json(infoAdicionais);
    }
    catch (error) {
        console.error('Erro ao criar informações adicionais.', error);
        res.status(500).json({ message: 'Erro ao criar informações adicionais.' });
    }
};
exports.criarInfoAdicionaisController = criarInfoAdicionaisController;
const getInfoAdicionaisControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const infoAdicionais = await (0, infoAdicionaisRepository_1.getInfoAdicionaisById)(parseInt(id, 10));
        if (!infoAdicionais) {
            res.status(404).json({ message: 'Informações não encontradas.' });
        }
        else {
            res.status(200).json(infoAdicionais);
        }
    }
    catch (error) {
        console.error('Erro ao obter informações adicionais por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getInfoAdicionaisControllerById = getInfoAdicionaisControllerById;
const updateInfoAdicionaisControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const infoAtualizadas = await (0, infoAdicionaisRepository_1.updateInfoAdicionaisById)(parseInt(id, 10), newData);
        res.status(200).json(infoAtualizadas);
    }
    catch (error) {
        console.error('Erro ao atualizar informações por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar informações por ID' });
    }
};
exports.updateInfoAdicionaisControllerById = updateInfoAdicionaisControllerById;
const deleteInfoAdicionaisControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, infoAdicionaisRepository_1.deleteInfoAdicionaisById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao excluir informações atualizadas por ID', error);
        res.status(500).json({ message: 'Erro ao excluir informações atualizadas por ID' });
    }
};
exports.deleteInfoAdicionaisControllerById = deleteInfoAdicionaisControllerById;
