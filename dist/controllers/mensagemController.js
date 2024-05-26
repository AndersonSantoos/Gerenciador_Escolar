"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMensagemControllerById = exports.updateMensagemControllerById = exports.getMensagemControllerById = exports.criarMensagemController = void 0;
const mensagemRepository_1 = require("../repositories/mensagemRepository");
const criarMensagemController = async (req, res) => {
    const { servico_id, descricao } = req.body;
    try {
        const novoMensagem = await (0, mensagemRepository_1.criarMensagem)(servico_id, descricao);
        res.status(201).json(novoMensagem);
    }
    catch (error) {
        console.error('Erro ao criar mensagem', error);
        res.status(500).json({ message: 'Erro ao criar mensagem' });
    }
};
exports.criarMensagemController = criarMensagemController;
const getMensagemControllerById = async (req, res) => {
    const { uuid } = req.params;
    try {
        const mensagem = await (0, mensagemRepository_1.getMensagemById)(uuid);
        if (mensagem === null) {
            res.status(404).json({ message: 'Mensagem não encontrada' });
        }
        else {
            res.status(200).json(mensagem);
        }
    }
    catch (error) {
        console.error('Erro ao obter mensagem por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getMensagemControllerById = getMensagemControllerById;
const updateMensagemControllerById = async (req, res) => {
    const { uuid } = req.params;
    const newData = req.body;
    try {
        const mensagemAtualizada = await (0, mensagemRepository_1.updateMensagemById)(uuid, newData);
        res.status(200).json(mensagemAtualizada);
    }
    catch (error) {
        console.error('Erro ao atualizar mensagem por UUID', error); // Aqui você deve indicar que o erro está relacionado ao UUID
        res.status(500).json({ message: 'Erro ao atualizar mensagem por UUID' }); // Aqui você também atualiza a mensagem de erro
    }
};
exports.updateMensagemControllerById = updateMensagemControllerById;
const deleteMensagemControllerById = async (req, res) => {
    try {
        const { uuid } = req.params;
        await (0, mensagemRepository_1.deleteMensagemById)(uuid);
        res.status(200).json({ message: 'Mensagem deletada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao excluir mensagem por UUID', error);
        res.status(500).json({ message: 'Erro ao excluir mensagem por UUID' });
    }
};
exports.deleteMensagemControllerById = deleteMensagemControllerById;
