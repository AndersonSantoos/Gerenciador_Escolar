import Anexo from '../models/anexoModel';

const seedAnexo = async () => {
    try {
        await Anexo.sync({ force: true }); // Recria a tabela
        await Anexo.bulkCreate([
            {servico_id: 1, mensagem_id: "750c9a28-1352-4546-9d6d-02c52d1cd12b", funcionario_id: 1},
            {servico_id: 2, mensagem_id: "693544b9-183b-4f7b-bf35-14a34f80c22b", funcionario_id: 2}
        ]);
        console.log('Seed de dados de anexo inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir seed de dados de anexo:', error);
    } finally {
        process.exit();
    }
};

seedAnexo();
