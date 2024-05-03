import Mensagem from '../models/mensagemModel';

export const criarMensagem = async (servico_id: number, descricao: string) => {
    try {
        return await Mensagem.create({ servico_id, descricao})
    } catch ( error ) {
        console.error('Erro ao criar cargo');
        throw error;
    }
}

export const getMensagemById = async (mensagem_id: number) => {
    const mensagem = await Mensagem.findByPk(mensagem_id);
    if (!mensagem) {
        throw new Error('Mensagem não encontrada.');
    }
    return mensagem;
};

export const updateMensagemById = async (mensagem_id: number, newData: Partial<Mensagem>) => {
    try {
        const mensagem = await Mensagem.findByPk(mensagem_id);
        if(!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await Mensagem.update(newData, { where: {mensagem_id: mensagem_id}});
        const mensagemAtualizada = await Mensagem.findByPk(mensagem_id);
        return mensagemAtualizada; 
    } catch ( error ) {
        throw new Error('Erro na atualização da mensagem por ID.')
    }
}

export const deleteMensagemById = async (mensagem_id: number) => { 
    try {
        const mensagem = await Mensagem.findByPk(mensagem_id);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagem.destroy();
        return ('Mensagem deletada com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava a mensagem pelo ID.');
    }
}