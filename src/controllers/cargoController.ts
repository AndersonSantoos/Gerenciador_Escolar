import { Request, Response } from 'express';
import { criarCargo, getCargoById, updateCargoById, deleteCargoById } from '../repositories/cargoRepository';

export const criarCargoController = async (req: Request, res: Response) => {
    const { funcao, isLeader } = req.body;
    try {
        const novoCargo = await criarCargo(funcao, isLeader);
        res.status(201).json(novoCargo);
    } catch (error) {
        console.error('Erro ao criar cargo', error);
        res.status(500).json({ message: 'Erro ao criar cargo' });
    }
};

export const getCargoControllerById = async (req: Request, res: Response) => {
    const { cargo_id } = req.params;
    try {
        const cargo = await getCargoById(parseInt(cargo_id, 10));
        if (!cargo) {
            res.status(404).json({ message: 'Cargo não encontrado' });
        } else {
            res.status(200).json(cargo);
        }
    } catch (error) {
        console.error('Erro ao obter cargo por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateCargoControllerById = async (req: Request, res: Response) => {
    const { cargo_id } = req.params;
    const newData = req.body;
    try {
        const cargoAtualizado = await updateCargoById(parseInt(cargo_id, 10), newData);
        res.status(200).json(cargoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar cargo por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar cargo por ID' });
    }
};

export const deleteCargoControllerById = async (req: Request, res: Response) => {
    try {
        const { cargo_id } = req.params;
        const result = await deleteCargoById(parseInt(cargo_id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao excluir cargo por ID', error);
        res.status(500).json({ message: 'Erro ao excluir cargo por ID' });
    }
};
