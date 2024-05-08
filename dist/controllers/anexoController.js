"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnexoControllerById = exports.updateAnexoControllerById = exports.getAnexoControllerById = exports.criarAnexoController = void 0;
const anexoRepository_1 = require("../repositories/anexoRepository");
const criarAnexoController = async (req, res) => {
    const { servico_id, mensagem_id, funcionario_id } = req.body;
    try {
        const novoAnexo = await (0, anexoRepository_1.criarAnexo)(servico_id, mensagem_id, funcionario_id);
        res.status(201).json(novoAnexo);
    }
    catch (error) {
        console.error('Erro ao criar anexo', error);
        res.status(500).json({ message: 'Erro ao criar anexo' });
    }
};
exports.criarAnexoController = criarAnexoController;
const getAnexoControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const anexo = await (0, anexoRepository_1.getAnexoById)(parseInt(id, 10));
        if (!anexo) {
            res.status(404).json({ message: 'Anexo não encontrado' });
        }
        else {
            res.status(200).json(anexo);
        }
    }
    catch (error) {
        console.error('Erro ao obter anexo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getAnexoControllerById = getAnexoControllerById;
const updateAnexoControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const anexoAtualizado = await (0, anexoRepository_1.updateAnexoById)(parseInt(id, 10), newData);
        res.status(200).json(anexoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.updateAnexoControllerById = updateAnexoControllerById;
const deleteAnexoControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, anexoRepository_1.deleteAnexoById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar anexo por ID' });
    }
};
exports.deleteAnexoControllerById = deleteAnexoControllerById;
