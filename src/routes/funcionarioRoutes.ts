import express, { Request, Response } from "express";
import { criarFuncionarioController,
         getFuncionarioControllerById,
         updateFuncionarioControllerById,
         deleteFuncionarioByIdController } from "../controllers/funcionarioController";

const router = express.Router();

router.post('/registrarFuncionario', async (req: Request, res: Response) => {
    try {
        await criarFuncionarioController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
}); 

router.get('/funcionario/:funcionario_id', async (req: Request, res: Response) => {
  try{
    const funcionario = await getFuncionarioControllerById(req, res);
    if(funcionario === null) {
      return res.status(404).send('Fucnionário não encontrado.')
    }
    res.status(200).json(funcionario);
  } catch ( error ) {
    console.error('Erro na rota:', error);
    res.status(500).json({error: 'Erro interno do servidor.'})
  }
});



  router.put('/funcionario/:funcionario_id', async (req: Request, res: Response) => {
    try {
      const updateFuncionario = await updateFuncionarioControllerById(req, res);
      res.status(200).json(updateFuncionario);
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

  router.delete('/funcionario/:funcionario_id', async (req: Request, res: Response) => {
    try {
      const result = await deleteFuncionarioByIdController(req, res);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Erro na rota:', error);
      res.status(500).json('Erro interno do servidor.');
    }
  });
  
  export default router;