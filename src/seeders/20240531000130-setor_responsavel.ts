import SetorResponsavel from '../models/setorResponsavelModel';

const seedSetorResponsavel = async () => {
  try {
    await SetorResponsavel.sync({ force: true }); // Recria a tabela
    await SetorResponsavel.bulkCreate([
      {nome: "Gerencia"},
      {nome: "Administrativo"},
      {nome: "Manutenção"}
    ]);
    console.log('Seed de dados Setor Responsável inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir seed de dados do Setor Responsável.')
  } finally {
    process.exit();
  }
}

seedSetorResponsavel();