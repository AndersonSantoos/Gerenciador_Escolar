import { Request, Response } from 'express';
import { criarAnexo, getAnexoById, updateAnexoById, deleteAnexoById } from '../repositories/anexoRepository';

export const criarAnexoController = async (req: Request, res: Response) => {
    const { servico_id, mensagem_id, funcionario_id } = req.body;
    try {
        const novoAnexo = await criarAnexo(servico_id, mensagem_id, funcionario_id);
        res.status(201).json(novoAnexo);
    } catch (error) {
        console.error('Erro ao criar anexo', error);
        res.status(500).json({ message: 'Erro ao criar anexo' });
    }
};

export const getAnexoControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const anexo = await getAnexoById(parseInt(id, 10));
        if (!anexo) {
            res.status(404).json({ message: 'Anexo não encontrado' });
        } else {
            res.status(200).json(anexo);
        }
    } catch ( error ) {
        console.error('Erro ao obter anexo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateAnexoControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const anexoAtualizado = await updateAnexoById(parseInt(id, 10), newData);
        res.status(200).json(anexoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const deleteAnexoControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteAnexoById(parseInt(id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar anexo por ID' });
    }
};