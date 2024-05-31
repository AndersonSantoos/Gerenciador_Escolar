import Cargo from '../models/cargoModel';

const seedCargos = async () => {
    try {
        await Cargo.sync({ force: true }); // Recria a tabela
        await Cargo.bulkCreate([
            { funcao: 'Gerente', isLeader: true, status: true },
            { funcao: 'Supervisor', isLeader: true, status: true },
            { funcao: 'Analista', isLeader: false, status: true },
            { funcao: 'Assistente', isLeader: false, status: true },
            { funcao: 'Estagiário', isLeader: false, status: false }
        ]);
        console.log('Seed de dados de Cargo inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir seed de dados de Cargo:', error);
    } finally {
        process.exit();
    }
};

seedCargos();
