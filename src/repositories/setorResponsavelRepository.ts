import SetorResponsavel from "../models/setorResponsavelModel";

export const criarSetorResponsavel = async (nome: string) => {
    try {
        return await SetorResponsavel.create({ nome })
    } catch ( error ) {
        console.error('Erro ao criar nome.');
        throw error;
    }
}

export const getSetorResponsavelById = async (id: number) => {
    const setorResponsavel = await SetorResponsavel.findByPk(id);
    if (!setorResponsavel) {
        throw new Error('Setor responsável não encontrado.');
    }
    return setorResponsavel;
};

export const updateSetorResponsavelById = async (id: number, newData: Partial<SetorResponsavel>) => {
    try {
        const setorResponsavel = await SetorResponsavel.findByPk(id);
        if(!setorResponsavel) {
            throw new Error('setor responsável não encontrado.');
        }
        await SetorResponsavel.update(newData, { where: {id: id}});
        const setorResponsavelAtualizado = await SetorResponsavel.findByPk(id);
        return setorResponsavelAtualizado; 
    } catch ( error ) {
        throw new Error('Erro na atualização do setor responsável por ID.')
    }
}

export const deleteSetorResponsavelById = async (id: number) => { 
    try {
        const setorResposanvel = await SetorResponsavel.findByPk(id);
        if (!setorResposanvel) {
            throw new Error('Setor responsável não encontrado.');
        }
        await setorResposanvel.destroy();
        return ('Setor responsável deletado com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava setor responsável pelo ID.');
    }
}