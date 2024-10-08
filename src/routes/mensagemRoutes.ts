import express, { Request, Response } from "express";
import { criarMensagemController,
         getMensagemControllerById,
         updateMensagemControllerById,
         deleteMensagemControllerById } from "../controllers/mensagemController";
         
const router = express.Router();

router.post('/registrarMensagem', async (req: Request, res: Response) => {
    try {
        await criarMensagemController(req, res);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.get('/mensagem/:uuid', async (req: Request, res: Response) => {
    try {
        const mensagem = await getMensagemControllerById(req, res);
        
        if (mensagem === null) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        } else {
            return res.status(200).json(mensagem);
        }
    } catch (error) {
        console.error('Erro na rota:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.put('/mensagem/:uuid', async (req: Request, res: Response) => {
    try {
        await updateMensagemControllerById(req, res); 
    } catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.'})
    }
});

router.delete('/mensagem/:uuid', async (req: Request, res: Response) => {
    try {
        await deleteMensagemControllerById(req, res);
    } catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});

export default router;
