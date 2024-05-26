import Tipo_servico from '../models/tipo_servicoModel';

export const criarTipo_servico = async (setor_responsavel_id: number, nome: string, status: boolean, prazo_resolucao: Date, prazo_minimo: Date) => {
    try {
        return await Tipo_servico.create({ setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo });
    } catch (error) {
        console.error('Erro ao criar tipo de serviço.');
        throw error;
    }
}

export const getTipo_servicoById = async (id: number) => {
    const tipo_servico = await Tipo_servico.findByPk(id);
    if(!tipo_servico) {
        throw new Error('Tipo de serviço não encontrado.')
    }
    return tipo_servico;
}

export const updateTipo_servicoById = async (id: number, newData: Partial<Tipo_servico>) => {
    try {
        const tipo_servico = await Tipo_servico.findByPk(id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        await Tipo_servico.update(newData, { where: { id: id } });
        const tipo_servicoAtualizado = await Tipo_servico.findByPk(id);
        return tipo_servicoAtualizado;
    } catch (error) {
        throw new Error('Erro na atualização do tipo de serviço por ID.');
    }
}

export const deleteTipo_servicoById = async (id: number) => {
    try {
        const tipo_servico = await Tipo_servico.findByPk(id);
        if(!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.')
        }
        await tipo_servico.destroy();
        return ('Tipo de serviço deletado com sucesso!');
    } catch ( error ) {
        throw new Error('Erro enquanto deletava o tipo de serviço pelo ID.')
    }
}