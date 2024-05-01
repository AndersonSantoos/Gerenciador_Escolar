import express, { Request, Response } from "express";
import { criarCargoController,
         getCargoControllerById,
         updateCargoControllerById,
         deleteCargoControllerById } from "../controllers/cargoController";
         
const router = express.Router();

router.post('/registrarCargo', async (req: Request, res: Response) =>{
    try {
        await criarCargoController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/cargo/:cargo_id', async (req: Request, res: Response) => {
    try {
        const cargo = await getCargoControllerById(req, res);
        
        if (cargo === null) {
            return res.status(404).send('Cargo não encontrado.');
        }

        res.status(200).json(cargo);
    } catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/cargo/:cargo_id', async (req: Request, res: Response) => {
  try {
      await updateCargoControllerById(req, res); 
  } catch ( error ) {
      console.error('Erro na rota', error);
      res.status(500).json({ message: 'Erro interno do servidor.'})
  }
});

router.delete('/cargo/:cargo_id', async (req: Request, res: Response) => {
  try {
      await deleteCargoControllerById(req, res);
  } catch (error) {
      console.error('Erro na rota', error);
      res.status(500).json('Erro interno do servidor.');
  }
});

export default router;