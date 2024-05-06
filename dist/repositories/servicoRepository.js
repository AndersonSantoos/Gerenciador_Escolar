"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicoById = exports.updateServicoById = exports.getServicoById = exports.criarServico = void 0;
const servicoModel_1 = __importDefault(require("../models/servicoModel"));
var StatusServico;
(function (StatusServico) {
    StatusServico["Ativo"] = "Ativo";
    StatusServico["Inativo"] = "Inativo";
    StatusServico["EmAndamento"] = "Em andamento";
    StatusServico["Concluido"] = "Conclu\u00EDdo";
    StatusServico["Cancelado"] = "Cancelado";
    StatusServico["Pendente"] = "Pendente";
    StatusServico["EmEspera"] = "Em espera";
})(StatusServico || (StatusServico = {}));
const criarServico = async (funcionario_id, titulo, status, prazo_resolucao) => {
    try {
        if (!(Object.values(StatusServico).includes(status))) {
            throw new Error('Status inválido.');
        }
        return await servicoModel_1.default.create({ funcionario_id, titulo, status, prazo_resolucao });
    }
    catch (error) {
        console.error('Erro ao criar serviço', error);
        throw error;
    }
};
exports.criarServico = criarServico;
const getServicoById = async (id) => {
    try {
        const servico = await servicoModel_1.default.findByPk(id);
        return servico;
    }
    catch (error) {
        throw new Error('Erro enquanto busca servico por ID.');
    }
};
exports.getServicoById = getServicoById;
const updateServicoById = async (id, newData) => {
    try {
        const servico = await servicoModel_1.default.findByPk(id);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await servicoModel_1.default.update(newData, { where: { id: id } });
        return servico;
    }
    catch (error) {
        throw new Error('Erro na atualização do serviço por ID.');
    }
};
exports.updateServicoById = updateServicoById;
const deleteServicoById = async (id) => {
    try {
        const servico = await servicoModel_1.default.findByPk(id);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await servico.destroy();
        return 'Serviço deletado com sucesso!';
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o serviço pelo ID.');
    }
};
exports.deleteServicoById = deleteServicoById;
