import Mensagem from '../models/mensagemModel';
import { Op } from 'sequelize';

export const criarMensagem = async (servico_id: number, descricao: string) => {
    try {
        return await Mensagem.create({ servico_id, descricao })
    } catch (error) {
        console.error('Erro ao criar mensagem');
        throw error;
    }
}

export const getMensagemById = async (uuid: string) => {
    const mensagem = await Mensagem.findOne({
        where: {
            id: {
                [Op.eq]: uuid
            }
        }
    });
    if (!mensagem) {
        throw new Error('Mensagem não encontrada.');
    }
    return mensagem;
};


export const updateMensagemById = async (uuid: string, newData: Partial<Mensagem>) => {
    try {
        const mensagem = await Mensagem.findByPk(uuid);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await Mensagem.update(newData, { where: { id: uuid } }); 
        const mensagemAtualizada = await Mensagem.findByPk(uuid);
        return mensagemAtualizada;
    } catch (error) {
        throw new Error('Erro na atualização da mensagem por UUID.')
    }
}

export const deleteMensagemById = async (uuid: string) => {
    try {
        const mensagem = await Mensagem.findOne({ where: { id: uuid } }); 
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagem.destroy();
        return 'Mensagem deletada com sucesso!';
    } catch (error) {
        console.error('Erro enquanto deletava a mensagem pelo UUID:', error);
        throw new Error('Erro enquanto deletava a mensagem pelo UUID.');
    }
}
