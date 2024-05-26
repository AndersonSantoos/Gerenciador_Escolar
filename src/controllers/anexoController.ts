import { Request, Response } from 'express';
import { criarAnexo, getAnexoById, getFuncionarioById, getServicoById, getMensagemById, updateAnexoById, deleteAnexoById } from '../repositories/anexoRepository';

export const criarAnexoController = async (req: Request, res: Response) => {
    const { servico_id, mensagem_id, funcionario_id } = req.body;

    // Função para verificar se os IDs existem
    const verificarIDs = async () => {
        const [servico, mensagem, funcionario] = await Promise.all([
            getServicoById(servico_id),
            getMensagemById(mensagem_id),
            getFuncionarioById(funcionario_id)
        ]);

        if (!servico) {
            throw new Error('Serviço não encontrado');
        }
        if (!mensagem) {
            throw new Error('Mensagem não encontrada');
        }
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }
    };

    try {
        // Verifica se os IDs existem
        await verificarIDs();

        // Se todos os IDs existirem, cria um novo anexo
        const novoAnexo = await criarAnexo(servico_id, mensagem_id, funcionario_id);
        res.status(201).json(novoAnexo);
    } catch (error: any) {
        console.error('Erro ao criar anexo:', error);
        res.status(500).json({ message: 'Erro ao criar anexo', error: error.message });
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
