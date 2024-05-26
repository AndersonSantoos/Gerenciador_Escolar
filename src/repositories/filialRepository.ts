import Filial from '../models/filial';

export const criarFilial = async (nome: string) => {
    try {
        return await Filial.create({ nome });
    } catch ( error ) {
        console.error('Erro ao criar filial.');
        throw error;
    }
}

export const getFilialById = async (id: number) => {
    const filial = await Filial.findByPk(id);
    if(!filial) {
        throw new Error('Filial não encontrada.');
    }
    return filial;
}

export const updateFilialById = async (id: number, newData: Partial<Filial>) => {
    try {
        const filial = await Filial.findByPk(id);
        if(!filial) {
            throw new Error("Filial não encontrada.")
        }
        await Filial.update(newData, { where: {id: id}});
        const filialAtualizada = await Filial.findByPk(id);
        return filialAtualizada;
    } catch ( error ) {
        throw new Error('Erro na atualização da filial por ID.')
    }
}

export const deleteFilialById = async (id: number) => { 
    try {
        const filial = await Filial.findByPk(id);
        if (!filial) {
            throw new Error('Filial não encontrada.');
        }
        await filial.destroy();
        return ('Filial deletada com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava a filial pelo ID.');
    }
}