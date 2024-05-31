import Mensagem from '../models/mensagemModel';

const seedMensagem = async () => {
  try {
      await Mensagem.sync({ force: true }); // Recria a tabela
      await Mensagem.bulkCreate([
         {servico_id: 1, descricao: "Deve ser feito com brevidade."},
         {servico_id: 2, descricao: "Deve ser autorizado."}
      ]);
      console.log('Seed de dados de Mensagem inserido com sucesso!');
  } catch (error) {
      console.error('Erro ao inserir seed de dados de Mensagem:', error);
  } finally {
      process.exit();
  }
};

seedMensagem();