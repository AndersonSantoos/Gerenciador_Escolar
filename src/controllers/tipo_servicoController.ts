import { Request, Response } from 'express';
import SetorResponsavel from '../models/setorResponsavelModel';
import { criarTipo_servico,
         getTipo_servicoById,
         updateTipo_servicoById,
         deleteTipo_servicoById } from '../repositories/tipo_servicoRepository';

export const criarTipo_servicoController = async (req: Request, res: Response) => {
     try {
        const { setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo } = req.body;
                
        // Verifica se todos os campos necessários foram fornecidos
        if (!setor_responsavel_id || !nome || status === undefined || !prazo_resolucao || !prazo_minimo) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
            }

            // Verifica se o setor responsável (setor_responsavel_id) fornecido na requisição existe na tabela SetorResponsavel
        const setor = await SetorResponsavel.findByPk(parseInt(setor_responsavel_id));
        if (!setor) {
            console.error('Setor responsável não encontrado.');
            return res.status(404).send('Setor responsável não encontrado.');
        }
        
            // Cria o tipo de serviço usando a função do repositório
            const tipo_servicoCriado = await criarTipo_servico(setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo);
            res.status(201).json(tipo_servicoCriado);
            } catch (error) {
            console.error('Erro ao criar tipo de serviço', error);
            res.status(500).json({ message: 'Erro ao criar tipo de serviço.' });
            }
};

export const getTipo_servicoControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tipo_servico = await getTipo_servicoById(parseInt(id, 10));
        if (!tipo_servico) {
            res.status(404).json({ message: 'Tipo de serviço não encontrado' });
        } else {
            res.status(200).json(tipo_servico);
        }
    } catch (error) {
        console.error('Erro ao obter tipo de serviço por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateTipo_servicoControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        // Atualiza o tipo de serviço usando a função do repositório
        const tipo_servicoAtualizado = await updateTipo_servicoById(parseInt(id, 10), newData);
        res.status(200).json(tipo_servicoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar tipo de serviço por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar tipo de serviço por ID' });
    }
};

export const deleteTipo_servicoControllerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteTipo_servicoById(parseInt(id, 10));
        return result;
    } catch (error) {
        console.error('Erro ao excluir tipo de serviço por ID', error);
        res.status(500).json({ message: 'Erro ao excluir tipo de serviço por ID' });
    }
};
