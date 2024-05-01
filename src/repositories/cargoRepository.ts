import Cargo from '../models/cargoModel';

export const criarCargo = async (funcao: string, isLeader: boolean) => {
    try {
        return await Cargo.create({ funcao, isLeader})
    } catch ( error ) {
        console.error('Erro ao criar cargo');
        throw error;
    }
}

export const getCargoById = async (cargo_id: number) => {
    const cargo = await Cargo.findByPk(cargo_id);
    if (!cargo) {
        throw new Error('Cargo não encontrado.');
    }
    return cargo;
};

export const updateCargoById = async (cargo_id: number, newData: Partial<Cargo>) => {
    try {
        const cargo = await Cargo.findByPk(cargo_id);
        if(!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await Cargo.update(newData, { where: {cargo_id: cargo_id}});
        const cargoAtualizado = await Cargo.findByPk(cargo_id);
        return cargoAtualizado; 
    } catch ( error ) {
        throw new Error('Erro na atualização do cargo por ID.')
    }
}

export const deleteCargoById = async (cargo_id: number) => { 
    try {
        const cargo = await Cargo.findByPk(cargo_id);
        if (!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        const cargoDeletado = await cargo.destroy();
        return (cargoDeletado);
    } catch (error) {
        throw new Error('Erro enquanto deletava o cargo pelo ID.');
    }
}
