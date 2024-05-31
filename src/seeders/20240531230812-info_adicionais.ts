import informacoesAdicionais from "../models/informacoesAdicionaisModel";


const seedInfoAdicionais = async () => {
  try {
    await informacoesAdicionais.sync({ force: true }); // Recria a tabela
    await informacoesAdicionais.bulkCreate([
      {servico_id: 1, descricao: "Executar serviço."},
      {servico_id: 2, descricao: "Executar atividade."}
    ]);
    console.log('Seed de dados de Informações Adicionais inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir seed de dados de Informações adicionais.');
  } finally {
    process.exit();
  }
}

seedInfoAdicionais();