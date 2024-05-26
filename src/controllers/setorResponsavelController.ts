import { Request, Response } from 'express';
import { criarSetorResponsavel, getSetorResponsavelById, updateSetorResponsavelById, deleteSetorResponsavelById } from '../repositories/setorResponsavelRepository';

export const criarSetorResponsavelController = async (req: Request, res: Response) => {
    const { nome } = req.body;
    try {
        const novoSetorResponsavel = await criarSetorResponsavel(nome);
        res.status(201).json(novoSetorResponsavel);
    } catch (error) {
        console.error('Erro ao criar setor responsável', error);
        res.status(500).json({ message: 'Erro ao criar setor responsável' });
    }
};

export const getSetorResponsavelControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const setorResponsavel = await getSetorResponsavelById(parseInt(id, 10));
        if (!setorResponsavel) {
            res.status(404).json({ message: 'Setor responsável não encontrado' });
        } else {
            res.status(200).json(setorResponsavel);
        }
    } catch (error) {
        console.error('Erro ao obter setor responsável por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateSetorResponsavelControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const setorResponsavelAtualizado = await updateSetorResponsavelById(parseInt(id, 10), newData);
        res.status(200).json(setorResponsavelAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar setor responsável por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar setor responsável por ID' });
    }
};

export const deleteSetorResponsavelControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteSetorResponsavelById(parseInt(id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao excluir setor responsável por ID', error);
        res.status(500).json({ message: 'Erro ao excluir setor responsável por ID' });
    }
};
