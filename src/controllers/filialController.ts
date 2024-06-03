import { Request, Response } from 'express';
import { criarFilial, getFilialById, updateFilialById, deleteFilialById } from '../repositories/filialRepository';

export const criaFilialController = async (req: Request, res: Response) => {
    const { nome } = req.body;
    try {
        const novaFilial = await criarFilial(nome);
        res.status(201).json(novaFilial);
    } catch (error) {
        console.error('Erro ao criar filial', error);
        res.status(500).json({ message: 'Erro ao criar filial' });
    }
};

export const getFilialControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const filial = await getFilialById(parseInt(id, 10));
        if (!filial) {
            res.status(404).json({ message: 'Filial não encontrada' });
        } else {
            res.status(200).json(filial);
        }
    } catch (error) {
        console.error('Erro ao obter filial por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateFilialControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const filialAtualizada = await updateFilialById(parseInt(id, 10), newData);
        res.status(200).json(filialAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar filial por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar filial por ID' });
    }
};

export const deleteFilialControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteFilialById(parseInt(id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao excluir filial por ID', error);
        res.status(500).json({ message: 'Erro ao excluir filial por ID' });
    }
};
