import { Request, Response } from 'express';
import { criarAnexo, getAnexoById, getServicoById, updateAnexoById, deleteAnexoById, getMensagemById, getFuncionarioById } from '../repositories/anexoRepository';

export const criarAnexoController = async (req: Request, res: Response) => {
    const { servico_id, mensagem_id, funcionario_id } = req.body;
    try {
        // Verificar se os IDs existem no banco de dados
        const [mensagem, funcionario, servico] = await Promise.all([
            getMensagemById(mensagem_id),
            getFuncionarioById(funcionario_id),
            getServicoById(servico_id)
        ]);
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }

        if (!mensagem) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        }

        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }

        // Se todos os dados existirem, cria o anexo
        const novoAnexo = await criarAnexo(servico_id, mensagem_id, funcionario_id);
        res.status(201).json(novoAnexo);
    } catch (error) {
        console.error('Erro ao criar anexo:', error); // Adiciona mensagem de erro para facilitar a depuração
        res.status(500).json({ message: 'Erro ao criar anexo' });
    }
};

export const getAnexoControllerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const anexo = await getAnexoById(parseInt(id, 10));
        res.status(200).json(anexo);
    } catch (error) {
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
    const { id } = req.params;
    try {
        await deleteAnexoById(parseInt(id, 10));
        res.status(200).json({ message: 'Anexo deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir anexo por ID', error);
        res.status(500).json({ message: 'Erro ao excluir anexo por ID' });
    }
};
