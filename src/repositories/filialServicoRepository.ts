import FilialServico from '../models/filialServico';

export const criarFilialServico = async (nome: string) => {
    try {
        return await FilialServico.create({ nome });
    } catch ( error ) {
        console.error('Erro ao criar filial.');
        throw error;
    }
}

export const getFilialServicoById = async (id: number) => {
    const filial = await FilialServico.findByPk(id);
    if(!filial) {
        throw new Error('Filial não encontrada.');
    }
    return filial;
}

export const updateFilialServicoById = async (id: number, newData: Partial<FilialServico>) => {
    try {
        const filial = await FilialServico.findByPk(id);
        if(!filial) {
            throw new Error("Filial não encontrada.")
        }
        await FilialServico.update(newData, { where: {id: id}});
        const filialAtualizada = await FilialServico.findByPk(id);
        return filialAtualizada;
    } catch ( error ) {
        throw new Error('Erro na atualização da filial por ID.')
    }
}

export const deleteFilialServicoById = async (id: number) => { 
    try {
        const filial = await FilialServico.findByPk(id);
        if (!filial) {
            throw new Error('Filial não encontrada.');
        }
        await filial.destroy();
        return ('Filial deletada com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava a filial pelo ID.');
    }
}