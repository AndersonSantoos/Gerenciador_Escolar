"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnexoControllerById = exports.updateAnexoControllerById = exports.getAnexoControllerById = exports.criarAnexoController = void 0;
const anexoRepository_1 = require("../repositories/anexoRepository");
const criarAnexoController = async (req, res) => {
    const { servico_id, mensagem_id, funcionario_id } = req.body;
    // Função para verificar se os IDs existem
    const verificarIDs = async () => {
        const [servico, mensagem, funcionario] = await Promise.all([
            (0, anexoRepository_1.getServicoById)(servico_id),
            (0, anexoRepository_1.getMensagemById)(mensagem_id),
            (0, anexoRepository_1.getFuncionarioById)(funcionario_id)
        ]);
        if (!servico) {
            throw new Error('Serviço não encontrado');
        }
        if (!mensagem) {
            throw new Error('Mensagem não encontrada');
        }
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }
    };
    try {
        // Verifica se os IDs existem
        await verificarIDs();
        // Se todos os IDs existirem, cria um novo anexo
        const novoAnexo = await (0, anexoRepository_1.criarAnexo)(servico_id, mensagem_id, funcionario_id);
        res.status(201).json(novoAnexo);
    }
    catch (error) {
        console.error('Erro ao criar anexo:', error);
        res.status(500).json({ message: 'Erro ao criar anexo', error: error.message });
    }
};
exports.criarAnexoController = criarAnexoController;
const getAnexoControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const anexo = await (0, anexoRepository_1.getAnexoById)(parseInt(id, 10));
        res.status(200).json(anexo);
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
    const { id } = req.params;
    try {
        await (0, anexoRepository_1.deleteAnexoById)(parseInt(id, 10));
        res.status(200).json({ message: 'Anexo deletado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao excluir anexo por ID', error);
        res.status(500).json({ message: 'Erro ao excluir anexo por ID' });
    }
};
exports.deleteAnexoControllerById = deleteAnexoControllerById;
