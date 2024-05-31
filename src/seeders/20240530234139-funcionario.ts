import Funcionario from '../models/funcionarioModel';

const seedFuncionario = async () => {
  try {
    await Funcionario.sync({ force: true }); // Recria a tabela
    await Funcionario.bulkCreate([
      {cargo_id: 1, filial_id: 1, nome: 'Anderson Santos', senha: "12345", status: true, email: "anderson@example.com"},
      {cargo_id: 2, filial_id: 1, nome: 'Tainara Pimentel', senha: "12345", status: true, email: "tainara@example.com"},
    ]);
    console.log('Seed de dados de Funcionario inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir seed de dados de Funcionario:', error);
  } finally {
    process.exit();
  }
};

seedFuncionario();