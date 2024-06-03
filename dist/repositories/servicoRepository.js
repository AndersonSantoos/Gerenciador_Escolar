"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicoById = exports.updateServicoById = exports.getServicoById = exports.criarServico = exports.somarDataPretendidaComPrazo = void 0;
const servicoModel_1 = __importDefault(require("../models/servicoModel"));
const tipo_servicoModel_1 = __importDefault(require("../models/tipo_servicoModel"));
const calcularPrazoResolucao = async (tipo_servico_id) => {
    const tipoServico = await tipo_servicoModel_1.default.findByPk(tipo_servico_id);
    if (!tipoServico) {
        throw new Error('Tipo de serviço não encontrado');
    }
    const prazoTipoServico = tipoServico.getDataValue('prazo');
    const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;
    const dataAbertura = new Date();
    return new Date(dataAbertura.getTime() + prazoMilissegundos);
};
const somarDataPretendidaComPrazo = async (servicoId, dataPretendida) => {
    try {
        const servico = await servicoModel_1.default.findByPk(servicoId);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }
        const tipoServico = await tipo_servicoModel_1.default.findByPk(servico.tipo_servico_id);
        if (!tipoServico) {
            throw new Error('Tipo de serviço não encontrado');
        }
        const prazoTipoServico = tipoServico.getDataValue('prazo');
        const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;
        const dataPretendidaMilissegundos = dataPretendida.getTime();
        const dataLimiteMilissegundos = servico.prazo_resolucao.getTime();
        const novaDataMilissegundos = dataPretendidaMilissegundos + prazoMilissegundos;
        if (novaDataMilissegundos <= dataLimiteMilissegundos) {
            return new Date(novaDataMilissegundos);
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Erro ao somar data pretendida com prazo:', error);
        throw error;
    }
};
exports.somarDataPretendidaComPrazo = somarDataPretendidaComPrazo;
const criarServico = async (filialServico_id, tipo_servico_id, funcionario_id, responsavel, titulo, status, prazo_resolucao, prazo_proposto, data_finalizacao) => {
    try {
        const prazoResolucao = await calcularPrazoResolucao(tipo_servico_id);
        return await servicoModel_1.default.create({ filialServico_id, tipo_servico_id, funcionario_id, responsavel, titulo, status, prazo_resolucao, prazo_proposto, data_finalizacao });
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
