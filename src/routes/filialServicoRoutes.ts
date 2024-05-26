import express, { Request, Response } from "express";
import { criaFilialServicoController,
         getFilialServicoControllerById,
         updateFilialServicoControllerById,
         deleteFilialServicoControllerById } from "../controllers/filialServicoController";
         
const router = express.Router();

router.post('/addFilialServico', async (req: Request, res: Response) =>{
    try {
        await criaFilialServicoController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/filialServico/:id', async (req: Request, res: Response) => {
    try {
        const cargo = await getFilialServicoControllerById(req, res);
        
        if (cargo === null) {
            return res.status(404).send('Filial não encontrada.');
        }

        res.status(200).json(cargo);
    } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/filialServico/:id', async (req: Request, res: Response) => {
  try {
      await updateFilialServicoControllerById(req, res); 
  } catch ( error ) {
      console.error('Erro na rota', error);
      res.status(500).json({ message: 'Erro interno do servidor.'})
  }
});

router.delete('/filialServico/:id', async (req: Request, res: Response) => {
  try {
      const result = await deleteFilialServicoControllerById(req, res);
      res.status(200).json({ message: result });
  } catch (error) {
      console.error('Erro na rota', error);
      res.status(500).json('Erro interno do servidor.');
  }
});

export default router;