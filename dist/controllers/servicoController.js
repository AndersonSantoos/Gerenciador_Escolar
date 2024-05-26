"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicoByIdController = exports.updateServicoControllerById = exports.getServicoControllerById = exports.criarServicoController = void 0;
const funcionarioModel_1 = __importDefault(require("../models/funcionarioModel"));
const servicoRepository_1 = require("../repositories/servicoRepository");
const criarServicoController = async (req, res) => {
    try {
        const { filialServico_id, tipo_servico_id, funcionario_id, responsavel, titulo, status, prazo_resolucao, prazo_proposto, data_finalizacao } = req.body;
        if (!filialServico_id || !tipo_servico_id || !funcionario_id || !responsavel || !titulo || !status || !prazo_resolucao) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
        }
        const funcionario = await funcionarioModel_1.default.findByPk(funcionario_id);
        if (!funcionario) {
            console.error('Funcionário não encontrado');
            return res.status(404).send('Funcionário não encontrado.');
        }
        await (0, servicoRepository_1.criarServico)(filialServico_id, tipo_servico_id, funcionario_id, responsavel, titulo, status, prazo_resolucao, prazo_proposto, data_finalizacao);
        console.log('Serviço cadastrado com sucesso.');
        res.status(201).send('Serviço cadastrado com sucesso.');
    }
    catch (error) {
        console.error('Erro interno no servidor:', error);
        res.status(500).send('Erro interno no servidor');
    }
};
exports.criarServicoController = criarServicoController;
const getServicoControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await (0, servicoRepository_1.getServicoById)(parseInt(id, 10));
        if (!servico) {
            return res.status(404).send('Serviço não encontrado.');
        }
        res.status(200).json(servico);
    }
    catch (error) {
        console.error('Error ao encontrar serviço', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getServicoControllerById = getServicoControllerById;
const updateServicoControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateServico = await (0, servicoRepository_1.updateServicoById)(parseInt(id, 10), newData);
        res.status(200).json(updateServico);
    }
    catch (error) {
        console.error('Erro ao atualizar o serviço', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.updateServicoControllerById = updateServicoControllerById;
const deleteServicoByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, servicoRepository_1.deleteServicoById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao deletar serviço:', error);
        res.status(500).send('Erro ao deletar serviço por ID.');
    }
};
exports.deleteServicoByIdController = deleteServicoByIdController;
