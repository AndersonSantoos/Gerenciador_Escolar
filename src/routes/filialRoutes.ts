import express, { Request, Response } from "express";
import { criaFilialController,
         getFilialControllerById,
         updateFilialControllerById,
         deleteFilialControllerById } from "../controllers/filialController";
         
const router = express.Router();

router.post('/registrarFilial', async (req: Request, res: Response) =>{
    try {
        await criaFilialController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/filial/:id', async (req: Request, res: Response) => {
    try {
        const cargo = await getFilialControllerById(req, res);
        
        if (cargo === null) {
            return res.status(404).send('Filial não encontrada.');
        }

        res.status(200).json(cargo);
    } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/filial/:id', async (req: Request, res: Response) => {
  try {
      await updateFilialControllerById(req, res); 
  } catch ( error ) {
      console.error('Erro na rota', error);
      res.status(500).json({ message: 'Erro interno do servidor.'})
  }
});

router.delete('/filial/:id', async (req: Request, res: Response) => {
  try {
      const result = await deleteFilialControllerById(req, res);
      res.status(200).json({ message: result });
  } catch (error) {
      console.error('Erro na rota', error);
      res.status(500).json('Erro interno do servidor.');
  }
});

export default router;