import { Request, Response } from "express";
import Cargo from '../models/cargoModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {criarFuncionario,
        getFuncionarioById,
        updateFuncionarioById,
        deleteFuncionarioById } from "../repositories/funcionarioRepository";
  
export const criarFuncionarioController = async ( req: Request, res: Response ) => {
    try {
        const { cargo_id, filial_id, nome, status, email, senha, confirmSenha } = req.body;
        if(!cargo_id || !filial_id || !nome || !status || !email || !senha || !confirmSenha) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
        }
        if(senha !== confirmSenha) {
            console.error('Senhas não coincidem.');
            return res.status(400).send('Senhas não coincidem');
        }
        // Verifica se o cargo (cargo_id) fornecido na requisição existe na tabela Cargo
        const cargo = await Cargo.findByPk(parseInt(cargo_id)); // Convertendo para número
        if (!cargo) {
        console.error('Position not found');
        return res.status(404).send('Cargo não encontrado.');
    }
    const hashedSenha = await bcrypt.hash(senha, 10);
    await criarFuncionario(cargo_id, filial_id, nome, status, email, hashedSenha);
    console.log('Funcionário cadastrado com sucesso.');
    res.status(201).send('Funcionário cadastrado com sucesso.')
    } catch ( error ) {
        console.error('Erro interno no servidor:', error);
        res.status(500).send('Erro interno no servidor');
    }
}        

export const getFuncionarioControllerById = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const funcionario = await getFuncionarioById(parseInt(id, 10))
        if(!funcionario) {
            return res.status(404).send('Funcionário não encontrado.');
        }
        res.status(200).json(funcionario);
    } catch ( error ) {
        console.error('Error ao encontrar funcionário', error);
        res.status(500).json({ error: 'Erro interno do servidor.'})
    }
};

export const updateFuncionarioControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateFuncionario = await updateFuncionarioById(parseInt(id, 10), newData);
        res.status(200).json(updateFuncionario);
        } catch ( error ) {
            console.error('Erro ao atualizar o funcionário', error);
            res.status(500).json({ error: 'Erro interno do servidor.'});
        }
}

export const deleteFuncionarioByIdController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await deleteFuncionarioById(parseInt(id, 10));
      return result; 
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw new Error('Erro ao deletar funcionário por ID.');
    }
  };