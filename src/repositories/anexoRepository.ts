import { Op } from 'sequelize';
import Anexo from '../models/anexoModel';
import Funcionario from '../models/funcionarioModel';
import Mensagem from '../models/mensagemModel';
import Servico from '../models/servicoModel';

export const criarAnexo = async (servico_id: number, mensagem_id: string, funcionario_id: number) => {
    try {
        return await Anexo.create({ servico_id, mensagem_id, funcionario_id });
    } catch (error) {
        console.error('Erro ao criar anexo', error);
        throw error;
    }
};

// Função para obter um funcionário pelo ID
export const getFuncionarioById = async (id: number) => {
    try {
        return await Funcionario.findByPk(id);
    } catch (error) {
        console.error('Erro ao obter funcionário por ID', error);
        throw error;
    }
};

export const getServicoById = async (servico_id: number) => {
    try {
        const servico = await Servico.findByPk(servico_id);
        return servico;
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        return null;
    }
};

// Função para obter uma mensagem pelo ID
export const getMensagemById = async (id: string) => {
    try {
        return await Mensagem.findByPk(id);
    } catch (error) {
        console.error('Erro ao obter mensagem por ID', error);
        throw error;
    }
};

export const getAnexoById = async (id: number) => {
    try {
        const anexo = await Anexo.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        return anexo;
    } catch (error) {
        console.error('Erro ao obter anexo por ID', error);
        throw error;
    }
};

export const updateAnexoById = async (id: number, newData: Partial<Anexo>) => {
    try {
        const anexo = await Anexo.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.update(newData);
        return anexo;
    } catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        throw error;
    }
};

export const deleteAnexoById = async (id: number) => {
    try {
        const anexo = await Anexo.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.destroy();
        return 'Anexo deletado com sucesso!';
    } catch (error) {
        console.error('Erro ao deletar anexo', error);
        throw error;
    }
};
