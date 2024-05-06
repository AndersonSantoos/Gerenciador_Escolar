import { Request, Response } from 'express';
import { criarInfoAdicionais,
         getInfoAdicionaisById,
         updateInfoAdicionaisById,
         deleteInfoAdicionaisById } from '../repositories/infoAdicionaisRepository';

export const criarInfoAdicionaisController = async (req: Request, res: Response) => {
    const { servico_id, descricao } = req.body;
    try {
        const infoAdicionais = await criarInfoAdicionais(servico_id, descricao);
        res.status(201).json(infoAdicionais);
    } catch ( error ) {
        console.error('Erro ao criar informações adicionais.', error);
        res.status(500).json({ message: 'Erro ao criar informações adicionais.'})
    }
};

export const getInfoAdicionaisControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const infoAdicionais = await getInfoAdicionaisById(parseInt(id, 10));
        if (!infoAdicionais) {
            res.status(404).json({ message: 'Informações não encontradas.' });
        } else {
            res.status(200).json(infoAdicionais);
        }
    } catch (error) {
        console.error('Erro ao obter informações adicionais por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateInfoAdicionaisControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const infoAtualizadas = await updateInfoAdicionaisById(parseInt(id, 10), newData);
        res.status(200).json(infoAtualizadas);
    } catch (error) {
        console.error('Erro ao atualizar informações por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar informações por ID' });
    }
};

export const deleteInfoAdicionaisControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteInfoAdicionaisById(parseInt(id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao excluir informações atualizadas por ID', error);
        res.status(500).json({ message: 'Erro ao excluir informações atualizadas por ID' }); 
    }
};
