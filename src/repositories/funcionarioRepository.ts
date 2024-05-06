import Funcionario from '../models/funcionarioModel';

export const criarFuncionario = async (
    cargo_id: number,
    nome: string,
    status: boolean,
    email: string,
    filial: number,
    senha: string
) => {
    try {
        return await Funcionario.create({ cargo_id, nome, status, email, filial, senha });
    } catch (error) {
        console.error('Erro ao criar funcionário', error);
        throw error;
    }
}

export const getFuncionarioById = async (id: number) => {
    try {
        const funcionario = await Funcionario.findByPk(id);
        return funcionario;
    } catch ( error ) {
        throw new Error('Erro enquanto busca funcionário por ID.');
    }
}

export const updateFuncionarioById = async (id: number, newData: Partial<Funcionario>) => {
    try {
        const funcionario = await Funcionario.findByPk(id);
        if(!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await Funcionario.update(newData, { where: {id: id}});
        return funcionario;
    } catch ( error ) {
        throw new Error('Erro na atualização do funcionário por ID.')
    }
}

export const deleteFuncionarioById = async ( id: number ) => {
    try {
        const funcionario = await Funcionario.findByPk(id);
        if(!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionario.destroy();
        return 'Funcionário deletado com sucesso!'
    } catch ( error ) {
        throw new Error('Erro enquanto deletava o funcionário pelo ID.')
    }
}