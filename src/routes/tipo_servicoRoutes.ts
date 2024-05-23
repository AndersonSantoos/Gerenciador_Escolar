import express, { Request, Response } from "express";
import { criarTipo_servicoController,
         getTipo_servicoControllerById,
         updateTipo_servicoControllerById,
         deleteTipo_servicoControllerById } from "../controllers/tipo_servicoController";

const router = express.Router();

router.post('/registrarTipo_servico', async (req: Request, res: Response) => {
    try {
        await criarTipo_servicoController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
}); 

router.get('/tipo_servico/:id', async (req: Request, res: Response) => {
  try{
    const servico = await getTipo_servicoControllerById(req, res);
    if(servico === null) {
      return res.status(404).send('Fucnionário não encontrado.')
    }
    res.status(200).json(servico);
  } catch ( error ) {
    console.error('Erro na rota:', error);
    res.status(500).json({error: 'Erro interno do servidor.'})
  }
});

router.put('/tipo_servico/:id', async (req: Request, res: Response) => {
    try {
      const updateServico = await updateTipo_servicoControllerById(req, res);
      res.status(200).json(updateServico);
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

router.delete('/tipo_servico/:id', async (req: Request, res: Response) => {
    try {
      const result = await  deleteTipo_servicoControllerById(req, res);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json('Erro interno do servidor.');
    }
  });
  
  export default router;