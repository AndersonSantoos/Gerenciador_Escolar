import Servico from '../models/servicoModel';
import Funcionario from '../models/funcionarioModel';

enum StatusServico {
    Ativo = 'Ativo',
    Inativo = 'Inativo',
    EmAndamento = 'Em andamento',
    Concluido = 'Concluído',
    Cancelado = 'Cancelado',
    Pendente = 'Pendente',
    EmEspera = 'Em espera'
}
export const criarServico = async (
     funcionario_id: number,
      titulo: string,
       status: StatusServico,
        prazo_resolucao: string ) => {
    try {
        if(!(Object.values(StatusServico).includes(status))) {
            throw new Error('Status inválido.')
        }
        return await Servico.create({ funcionario_id, titulo, status, prazo_resolucao });
    } catch (error) {
        console.error('Erro ao criar serviço', error);
        throw error;
    }
}

export const getServicoById = async (id: number) => {
    try {
        const servico = await Servico.findByPk(id);
        return servico;
    } catch ( error ) {
        throw new Error('Erro enquanto busca servico por ID.');
    }
}

export const updateServicoById = async (id: number, newData: Partial<Servico>) => {
    try {
        const servico = await Servico.findByPk(id);
        if(!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await Servico.update(newData, { where: {id: id}});
        return servico;
    } catch ( error ) {
        throw new Error('Erro na atualização do serviço por ID.')
    }
}

export const deleteServicoById = async ( id: number ) => {
    try {
        const servico = await Servico.findByPk(id);
        if(!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await servico.destroy();
        return 'Serviço deletado com sucesso!'
    } catch ( error ) {
        throw new Error('Erro enquanto deletava o serviço pelo ID.')
    }
}