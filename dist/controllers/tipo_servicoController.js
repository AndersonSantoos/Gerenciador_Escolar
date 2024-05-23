"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipo_servicoControllerById = exports.updateTipo_servicoControllerById = exports.getTipo_servicoControllerById = exports.criarTipo_servicoController = void 0;
const setorResponsavelModel_1 = __importDefault(require("../models/setorResponsavelModel"));
const tipo_servicoRepository_1 = require("../repositories/tipo_servicoRepository");
// Função para converter uma string de data para o formato ISO8601
const formatDateForSQL = (date) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
};
const criarTipo_servicoController = async (req, res) => {
    try {
        const { setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo } = req.body;
        if (!setor_responsavel_id || !nome || status === undefined || !prazo_resolucao || !prazo_minimo) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
        }
        // Converte as strings de data para objetos Date
        const prazoResolucaoDate = new Date(prazo_resolucao);
        const prazoMinimoDate = new Date(prazo_minimo);
        const setorResponsavel = await setorResponsavelModel_1.default.findByPk(parseInt(setor_responsavel_id, 10));
        if (!setorResponsavel) {
            console.error('Setor responsável não encontrado.');
            return res.status(404).send('Setor responsável não encontrado.');
        }
        const tipo_servico = await (0, tipo_servicoRepository_1.criarTipoServico)(setor_responsavel_id, nome, status, prazoResolucaoDate, prazoMinimoDate);
        res.status(201).json(tipo_servico);
    }
    catch (error) {
        console.error('Erro ao criar tipo de serviço', error);
        res.status(500).json({ message: 'Erro ao criar tipo de serviço.' });
    }
};
exports.criarTipo_servicoController = criarTipo_servicoController;
const getTipo_servicoControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipo_servico = await (0, tipo_servicoRepository_1.getTipo_servicoById)(parseInt(id, 10));
        if (!tipo_servico) {
            res.status(404).json({ message: 'Tipo de serviço não encontrado' });
        }
        else {
            res.status(200).json(tipo_servico);
        }
    }
    catch (error) {
        console.error('Erro ao obter tipo de serviço por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getTipo_servicoControllerById = getTipo_servicoControllerById;
const updateTipo_servicoControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        // Converta as strings de data em objetos Date
        if (newData.prazo_resolucao) {
            newData.prazo_resolucao = new Date(newData.prazo_resolucao);
        }
        if (newData.prazo_minimo) {
            newData.prazo_minimo = new Date(newData.prazo_minimo);
        }
        const tipo_servicoAtualizado = await (0, tipo_servicoRepository_1.updateTipo_servicoById)(parseInt(id, 10), newData);
        res.status(200).json(tipo_servicoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar tipo de serviço por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar tipo de serviço por ID' });
    }
};
exports.updateTipo_servicoControllerById = updateTipo_servicoControllerById;
const deleteTipo_servicoControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, tipo_servicoRepository_1.deleteTipo_servicoById)(parseInt(id, 10));
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro ao excluir tipo de serviço por ID', error);
        res.status(500).json({ message: 'Erro ao excluir tipo de serviço por ID' });
    }
};
exports.deleteTipo_servicoControllerById = deleteTipo_servicoControllerById;
