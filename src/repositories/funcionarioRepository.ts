import Funcionario from '../models/funcionarioModel';

enum StatusFuncionario {
    Ativo = 'ativo',
    Inativo = 'inativo'
}

export const criarFuncionario = async (cargo_id: number, nome: string, senha: string,
     status: StatusFuncionario, email: string, filial: string) => {
    try {
        if (!(status in StatusFuncionario)) {
            throw new Error('Status inválido');
        }
        return await Funcionario.create({ cargo_id, nome, senha, status, email, filial });
    } catch (error) {
        console.error('Erro ao criar funcionário', error);
        throw error;
    }
}

export const getFuncionarioById = async (funcionario_id: number) => {
    try {
        const funcionario = await Funcionario.findByPk(funcionario_id);
        return funcionario;
    } catch ( error ) {
        throw new Error('Erro enquanto busca funcionário por ID.');
    }
}

export const updateFuncionarioById = async (funcionario_id: number, newData: Partial<Funcionario>) => {
    try {
        const funcionario = await Funcionario.findByPk(funcionario_id);
        if(!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await Funcionario.update(newData, { where: {funcionario_id: funcionario_id}});
        return funcionario;
    } catch ( error ) {
        throw new Error('Erro na atualização do funcionário por ID.')
    }
}

export const deleteFuncionarioById = async ( funcionario_id: number ) => {
    try {
        const funcionario = await Funcionario.findByPk(funcionario_id);
        if(!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionario.destroy();
        return 'Funcionário deleteado com sucesso!'
    } catch ( error ) {
        throw new Error('Erro enquanto deletava o funcionário pelo ID.')
    }
}