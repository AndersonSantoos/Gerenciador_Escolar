import { Request, Response } from "express";
import Funcionario from '../models/funcionarioModel';
import jwt from 'jsonwebtoken';
import {criarServico,
        getServicoById,
        updateServicoById,
        deleteServicoById } from "../repositories/servicoRepository";

export const criarServicoController = async ( req: Request, res: Response ) => {
    try {
        const { funcionario_id, titulo, status, prazo_resolucao } = req.body;
        if(!funcionario_id || !titulo || !status || !prazo_resolucao  ) {
             console.error('Todos os campos são necessários.');
             return res.status(400).send('Todos os campos são necessários.');
            }
                
        // Verifica se o funcionario (funcionario_id) fornecido na requisição existe na tabela funcionario
        const funcionario = await Funcionario.findByPk(parseInt(funcionario_id)); // Convertendo para número
        if (!funcionario) {
        console.error('Funcionário não encontrado');
        return res.status(404).send('Funcionário não encontrado.');
            }
        await criarServico(funcionario_id, titulo, status, prazo_resolucao);
        console.log('Serviço cadastrado com sucesso.');
        res.status(201).send('Serviço cadastrado com sucesso.')
            } catch ( error ) {
            console.error('Erro interno no servidor:', error);
            res.status(500).send('Erro interno no servidor');
        }
}

export const getServicoControllerById = async ( req: Request, res: Response) => {
    try {
        const { servico_id } = req.params;
        const servico = await getServicoById(parseInt(servico_id, 10))
        if(!servico) {
            return res.status(404).send('Serviço não encontrado.');
        }
        res.status(200).json(servico);
    } catch ( error ) {
        console.error('Error ao encontrar serviço', error);
        res.status(500).json({ error: 'Erro interno do servidor.'})
    }
};

export const updateServicoControllerById = async (req: Request, res: Response) => {
    try {
        const { servico_id } = req.params;
        const newData = req.body;
        const updateServico = await updateServicoById(parseInt(servico_id, 10), newData);
        res.status(200).json(updateServico);
        } catch ( error ) {
            console.error('Erro ao atualizar o serviço', error);
            res.status(500).json({ error: 'Erro interno do servidor.'});
        }
}

export const deleteServicoByIdController = async (req: Request, res: Response) => {
    try {
      const { servico_id } = req.params;
      const result = await deleteServicoById(parseInt(servico_id, 10));
      return result; 
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      throw new Error('Erro ao deletar serviço por ID.');
    }
  };
        
        