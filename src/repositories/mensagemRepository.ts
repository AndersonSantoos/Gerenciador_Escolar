import Mensagem from '../models/mensagemModel';

export const criarMensagem = async (servico_id: number, descricao: string) => {
    try {
        return await Mensagem.create({ servico_id, descricao })
    } catch (error) {
        console.error('Erro ao criar mensagem');
        throw error;
    }
}

export const getMensagemById = async (id: string) => {
    const mensagem = await Mensagem.findByPk(id);
    if (!mensagem) {
        throw new Error('Mensagem não encontrada.');
    }
    return mensagem;
};

export const updateMensagemById = async (id: string, newData: Partial<Mensagem>) => {
    try {
        const mensagem = await Mensagem.findByPk(id);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await Mensagem.update(newData, { where: { id } });
        const mensagemAtualizada = await Mensagem.findByPk(id);
        return mensagemAtualizada;
    } catch (error) {
        throw new Error('Erro na atualização da mensagem por ID.')
    }
}

export const deleteMensagemById = async (id: string) => {
    try {
        const mensagem = await Mensagem.findByPk(id);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagem.destroy();
        return ('Mensagem deletada com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava a mensagem pelo ID.');
    }
}
