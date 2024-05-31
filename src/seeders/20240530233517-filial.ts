import Filial from '../models/filial';

const seedFilial = async () => {
    try {
        await Filial.sync({ force: true}); // Recria a tabela
        await Filial.bulkCreate([
            {nome: 'Boa Viagem'},
            {nome: 'Graças'}
        ]);
        console.log('Seed de dados de Filial inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir seed de dados de Filial:', error);
    } finally {
        process.exit();
    }
};

seedFilial();