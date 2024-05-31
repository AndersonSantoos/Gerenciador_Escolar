import Tipo_servico from "../models/tipo_servicoModel";

const seedTipoServico = async () => {
  try {
    await Tipo_servico.sync({ force: true }); // Recria a tabela
    await Tipo_servico.bulkCreate([
      { setor_responsavel_id: 1, nome: "Manutenção em notebook", status: true, prazo_resolucao: "2024-05-30", prazo_minimo: "2024-05-29" },
      { setor_responsavel_id: 2, nome: "Manutenção no laboratório", status: false, prazo_resolucao: "2024-03-30", prazo_minimo: "2024-03-29" },
      { setor_responsavel_id: 3, nome: "Manutenção em notebook", status: true, prazo_resolucao: "2024-02-30", prazo_minimo: "2024-02-29" }
    ]);
    console.log('Seed de dados do Tipo_servico inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir seed de dados do tipo_servico:', error);
  } finally {
    process.exit();
  }
}

seedTipoServico();