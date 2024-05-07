import { Request, Response } from 'express';
import { criarMensagem,
         getMensagemById,
         updateMensagemById,
         deleteMensagemById } from '../repositories/mensagemRepository';

export const criarMensagemController = async (req: Request, res: Response) => {
    const { servico_id, descricao } = req.body;
    try {
        const novoMensagem = await criarMensagem(servico_id, descricao);
        res.status(201).json(novoMensagem);
    } catch (error) {
        console.error('Erro ao criar mensagem', error);
        res.status(500).json({ message: 'Erro ao criar mensagem' });
    }
};

export const getMensagemControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensagem = await getMensagemById(id);
        if (!mensagem) {
            res.status(404).json({ message: 'Mensagem não encontrada' });
        } else {
            res.status(200).json(mensagem);
        }
    } catch (error) {
        console.error('Erro ao obter mensagem por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateMensagemControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const mensagemAtualizada = await updateMensagemById(id, newData);
        res.status(200).json(mensagemAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar mensagem por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar cargo por ID' });
    }
};

export const deleteMensagemControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteMensagemById(id);
        res.status(200).json({ message: 'Mensagem deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir mensagem por ID', error);
        res.status(500).json({ message: 'Erro ao excluir mensagem por ID' });
    }
};
