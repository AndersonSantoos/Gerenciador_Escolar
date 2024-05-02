import express, { Request, Response } from "express";
import { criarServicoController,
         getServicoControllerById,
         updateServicoControllerById,
         deleteServicoByIdController } from "../controllers/servicoController";

const router = express.Router();

router.post('/registrarServico', async (req: Request, res: Response) => {
    try {
        await criarServicoController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
}); 

router.get('/servico/:servico_id', async (req: Request, res: Response) => {
  try{
    const servico = await getServicoControllerById(req, res);
    if(servico === null) {
      return res.status(404).send('Fucnionário não encontrado.')
    }
    res.status(200).json(servico);
  } catch ( error ) {
    console.error('Erro na rota:', error);
    res.status(500).json({error: 'Erro interno do servidor.'})
  }
});

router.put('/servico/:servico_id', async (req: Request, res: Response) => {
    try {
      const updateServico = await updateServicoControllerById(req, res);
      res.status(200).json(updateServico);
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

router.delete('/servico/:servico_id', async (req: Request, res: Response) => {
    try {
      const result = await deleteServicoByIdController(req, res);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json('Erro interno do servidor.');
    }
  });
  
  export default router;