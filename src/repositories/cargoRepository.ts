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
        await Cargo.update(newData, { where: {id: cargo_id}});
        return cargo;
    } catch ( error ) {
        throw new Error('Erro na atualização do cargo por ID.')
    }
}

export const deleteCargoById = async ( cargo_id: number ) => {
    try {
        const cargo = await Cargo.findByPk(cargo_id);
        if(!cargo) {
            throw new Error('Cargo não encontrado.');
        }
        await cargo.destroy();
        return 'Funcionário deleteado com sucesso!'
    } catch ( error ) {
        throw new Error('Erro enquanto deletava o funcionário pelo ID.')
    }
}