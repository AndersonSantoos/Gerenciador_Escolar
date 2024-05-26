import Cargo from '../models/cargoModel';

export const criarCargo = async (funcao: string, isLeader: boolean, status: boolean) => {
    try {
        return await Cargo.create({ funcao, isLeader, status})
    } catch ( error ) {
        console.error('Erro ao criar cargo');
        throw error;
    }
}

export const getCargoById = async (id: number) => {
    const cargo = await Cargo.findByPk(id);
    if (!cargo) {
        throw new Error('Cargo não encontrado.');
    }
    return cargo;
};

export const updateCargoById = async (id: number, newData: Partial<Cargo>) => {
    try {
        const cargo = await Cargo.findByPk(id);
        if(!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await Cargo.update(newData, { where: {id: id}});
        const cargoAtualizado = await Cargo.findByPk(id);
        return cargoAtualizado; 
    } catch ( error ) {
        throw new Error('Erro na atualização do cargo por ID.')
    }
}

export const deleteCargoById = async (id: number) => { 
    try {
        const cargo = await Cargo.findByPk(id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await cargo.destroy();
        return ('Cargo deletado com sucesso!');
    } catch (error) {
        throw new Error('Erro enquanto deletava o cargo pelo ID.');
    }
}
