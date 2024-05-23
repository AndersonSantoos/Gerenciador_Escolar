import express, { Request, Response } from "express";
import { criarSetorResponsavelController,
         getSetorResponsavelControllerById,
         updateSetorResponsavelControllerById,
         deleteSetorResponsavelControllerById } from "../controllers/setorResponsavelController";
         
const router = express.Router();

router.post('/registrarSetorResposnavel', async (req: Request, res: Response) =>{
    try {
        await criarSetorResponsavelController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/setorResponsavel/:id', async (req: Request, res: Response) => {
    try {
        const cargo = await getSetorResponsavelControllerById(req, res);
        
        if (cargo === null) {
            return res.status(404).send('Setor responsável não encontrado.');
        }

        res.status(200).json(cargo);
    } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/setorResponsavel/:id', async (req: Request, res: Response) => {
  try {
      await updateSetorResponsavelControllerById(req, res); 
  } catch ( error ) {
      console.error('Erro na rota', error);
      res.status(500).json({ message: 'Erro interno do servidor.'})
  }
});

router.delete('/setorResponsavel/:id', async (req: Request, res: Response) => {
  try {
      const result = await deleteSetorResponsavelControllerById(req, res);
      res.status(200).json({ message: result });
  } catch (error) {
      console.error('Erro na rota', error);
      res.status(500).json('Erro interno do servidor.');
  }
});

export default router;