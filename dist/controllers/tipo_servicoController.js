"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipo_servicoControllerById = exports.updateTipo_servicoControllerById = exports.getTipo_servicoControllerById = exports.criarTipo_servicoController = void 0;
const setorResponsavelModel_1 = __importDefault(require("../models/setorResponsavelModel"));
const tipo_servicoRepository_1 = require("../repositories/tipo_servicoRepository");
const criarTipo_servicoController = async (req, res) => {
    try {
        const { setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo } = req.body;
        // Verifica se todos os campos necessários foram fornecidos
        if (!setor_responsavel_id || !nome || status === undefined || !prazo_resolucao || !prazo_minimo) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
        }
        // Verifica se o setor responsável (setor_responsavel_id) fornecido na requisição existe na tabela SetorResponsavel
        const setor = await setorResponsavelModel_1.default.findByPk(parseInt(setor_responsavel_id));
        if (!setor) {
            console.error('Setor responsável não encontrado.');
            return res.status(404).send('Setor responsável não encontrado.');
        }
        // Cria o tipo de serviço usando a função do repositório
        const tipo_servicoCriado = await (0, tipo_servicoRepository_1.criarTipo_servico)(setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo);
        res.status(201).json(tipo_servicoCriado);
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
        // Atualiza o tipo de serviço usando a função do repositório
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
        return result;
    }
    catch (error) {
        console.error('Erro ao excluir tipo de serviço por ID', error);
        res.status(500).json({ message: 'Erro ao excluir tipo de serviço por ID' });
    }
};
exports.deleteTipo_servicoControllerById = deleteTipo_servicoControllerById;
