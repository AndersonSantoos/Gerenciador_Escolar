import informacoesAdicionais from '../models/informacoesAdicionaisModel';

export const criarInfoAdicionais = async (servico_id: number, descricao: string) => {
    try { 
        return await informacoesAdicionais.create({ servico_id, descricao });
    } catch ( error ) {
        throw error;
    }
}

export const getInfoAdicionaisById = async (id: number) => {
    const infoAdicionais = await informacoesAdicionais.findByPk(id);
    if(!infoAdicionais) {
        throw new Error('Informações adicionais não encontradas.')
    }
    return infoAdicionais;
}

export const updateInfoAdicionaisById = async (id: number, newData: Partial<informacoesAdicionais>) => {
    try {
        const infoAdicionais = await informacoesAdicionais.findByPk(id);
        if(!infoAdicionais) {
            throw new Error('Informações adicionais não encontradas.');
        }
        await informacoesAdicionais.update(newData, { where: {id: id}});
        const infoAtualizadas = await informacoesAdicionais.findByPk(id);
        return infoAtualizadas;
    } catch ( error ) {
        throw new Error('Erro na atualização das informações atualizadas por ID.')
    }
}

export const deleteInfoAdicionaisById = async (id: number) => {
    try {
        const infoAdicionais = await informacoesAdicionais.findByPk(id);
        if(!infoAdicionais) {
            throw new Error('Informações não encontradas.')
        }
        await informacoesAdicionais.destroy();
        return ('Informações deletadas com sucesso!')
    } catch ( error ) {
        throw new Error('Erro enquanto deletava informações por ID.')
    }
}