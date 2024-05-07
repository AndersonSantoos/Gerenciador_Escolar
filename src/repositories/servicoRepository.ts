import Servico from '../models/servicoModel';
import TipoServico from '../models/tipo_servicoModel';

// Função para calcular o prazo de resolução
const calcularPrazoResolucao = async (tipo_servico_id: number): Promise<Date> => {
    const tipoServico = await TipoServico.findByPk(tipo_servico_id);
    if (!tipoServico) {
        throw new Error('Tipo de serviço não encontrado');
    }
    const prazoTipoServico = tipoServico.getDataValue('prazo');
    const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;
    const dataAbertura = new Date();
    return new Date(dataAbertura.getTime() + prazoMilissegundos);
}

export const somarDataPretendidaComPrazo = async (servicoId: number, dataPretendida: Date): Promise<Date | null> => {
    try {
        const servico = await Servico.findByPk(servicoId);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }

        const tipoServico = await TipoServico.findByPk(servico.tipo_servico_id);
        if (!tipoServico) {
            throw new Error('Tipo de serviço não encontrado');
        }

        const prazoTipoServico = tipoServico.getDataValue('prazo');
        const prazoMilissegundos = prazoTipoServico * 24 * 60 * 60 * 1000;
        const dataPretendidaMilissegundos = dataPretendida.getTime();
        const dataLimiteMilissegundos = servico.prazo_resolucao.getTime();
        const novaDataMilissegundos = dataPretendidaMilissegundos + prazoMilissegundos;

        if (novaDataMilissegundos <= dataLimiteMilissegundos) {
            return new Date(novaDataMilissegundos);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro ao somar data pretendida com prazo:', error);
        throw error;
    }
}

export const criarServico = async (
    filial_id: number,
    tipo_servico_id: number,
    funcionario_id: number,
    responsavel: string,
    titulo: string,
    status: string,
    prazo_resolucao: Date,
    prazo_proposto: Date | null,
    data_finalizacao: Date | null
) => {
    try {
        // Aqui você realiza o cálculo do prazo_resolucao antes de criar o serviço
        const prazoResolucao = await calcularPrazoResolucao(tipo_servico_id);

        return await Servico.create({ filial_id, tipo_servico_id, funcionario_id, responsavel, titulo, status, prazo_resolucao, prazo_proposto, data_finalizacao });
    } catch (error) {
        console.error('Erro ao criar serviço', error);
        throw error;
    }
}

export const getServicoById = async (id: number) => {
    try {
        const servico = await Servico.findByPk(id);
        return servico;
    } catch (error) {
        throw new Error('Erro enquanto busca servico por ID.');
    }
}

export const updateServicoById = async (id: number, newData: Partial<Servico>) => {
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await Servico.update(newData, { where: { id: id } });
        return servico;
    } catch (error) {
        throw new Error('Erro na atualização do serviço por ID.')
    }
}

export const deleteServicoById = async (id: number) => {
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }
        await servico.destroy();
        return 'Serviço deletado com sucesso!'
    } catch (error) {
        throw new Error('Erro enquanto deletava o serviço pelo ID.')
    }
}


