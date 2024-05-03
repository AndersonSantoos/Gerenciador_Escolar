import express, { Request, Response } from "express";
import { criarInfoAdicionaisController,
         getInfoAdicionaisControllerById,
         updateInfoAdicionaisControllerById,
         deleteInfoAdicionaisControllerById } from "../controllers/infoAdicionaisController";
         
const router = express.Router();

router.post('/registrarInfo', async (req: Request, res: Response) =>{
    try {
        await criarInfoAdicionaisController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/info/:informacoes_id', async (req: Request, res: Response) => {
    try {
        const cargo = await getInfoAdicionaisControllerById(req, res);
        
        if (cargo === null) {
            return res.status(404).send('Informações não encontradas.');
        }

        res.status(200).json(cargo);
    } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/info/:informacoes_id', async (req: Request, res: Response) => {
  try {
      await updateInfoAdicionaisControllerById(req, res); 
  } catch ( error ) {
      console.error('Erro na rota', error);
      res.status(500).json({ message: 'Erro interno do servidor.'})
  }
});
// NÃO VAI DELETAR PORQUE ESTÁ EM CASCATA COM A TABLE SERVIÇO
router.delete('/info/:informacoes_id', async (req: Request, res: Response) => {
  try {
      const result = await deleteInfoAdicionaisControllerById(req, res);
      res.status(200).json({ message: result });
  } catch (error) {
      console.error('Erro na rota', error);
      res.status(500).json('Erro interno do servidor.');
  }
});

export default router;