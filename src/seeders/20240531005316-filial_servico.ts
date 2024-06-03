import FilialServico from '../models/filialServico';

const seedFilialServico = async () => {
    try {
        await FilialServico.sync({ force: true }); // Recria a tabela
        await FilialServico.bulkCreate([
            {nome: 'Boa Viagem'},
            {nome: 'Graças'}
        ]);
        console.log('Seed de dados de Filial serviço inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir seed de dados de Filial serviço:', error);
    } finally {
        process.exit();
    }
};

seedFilialServico();
