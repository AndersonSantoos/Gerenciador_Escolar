import Anexo from '../models/anexoModel';

export const criarAnexo = async (servico_id: number, mensagem_id: number, funcionario_id: number) => {
    try {
        return await Anexo.create({ servico_id, mensagem_id, funcionario_id });
    } catch ( error ) {
        console.error('Erro ao criar cargo.');
        throw error;
    }
}

export const getAnexoById = async (id: number) => {
    const anexo = await Anexo.findByPk(id);
    if (!anexo) {
        throw new Error('Anexo não encontrado.');
    }
    return anexo;
};

export const updateAnexoById = async (id: number, newData: Partial<Anexo>) => {
    try {
        const anexo = await Anexo.findByPk(id);
        if(!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.update(newData);
        return anexo;
    } catch ( error ) {
        console.error('Erro ao atualizar anexo.');
        throw error;
    }
}

export const deleteAnexoById = async (id: number) => {
    try {
        const anexo = await Anexo.findByPk(id);
        if(!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.destroy();
    } catch ( error ) {
        console.error('Erro ao deletar anexo.');
        throw new Error('Erro enquanto deletava o anexo pelo ID.')
    }
}