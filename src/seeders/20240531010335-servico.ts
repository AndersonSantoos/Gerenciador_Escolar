import Servico from '../models/servicoModel';

const seedServico = async () => {
  try {
    await Servico.sync({ force: true }); // Recria a tabela
    await Servico.bulkCreate([
      { filialServico_id: 1, tipo_servico_id: 1, funcionario_id: 1, responsavel: "Marcos Antônio", titulo: "Manutenção", status: "Pendente", prazo_resolucao: new Date("2024-06-30"), prazo_proposto: new Date("2024-06-25"), data_finalizacao: new Date("2024-06-28") },
      { filialServico_id: 2, tipo_servico_id: 2, funcionario_id: 2, responsavel: "Marcos Felipe", titulo: "Limpeza", status: "Em andamento", prazo_resolucao: new Date("2024-07-30"), prazo_proposto: new Date("2024-07-25"), data_finalizacao: new Date("2024-07-28") }
    ]);
    console.log('Seed de dados de Serviço inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir seed de dados de Serviço:', error);
  } finally {
    process.exit();
  }
}

seedServico();
