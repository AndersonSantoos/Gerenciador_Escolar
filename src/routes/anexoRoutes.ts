import express, { Request, Response } from 'express';
import { criarAnexoController,
         getAnexoControllerById,
         updateAnexoControllerById,
         deleteAnexoControllerById } from '../controllers/anexoController';

const router = express.Router();

router.post('/criarAnexo', async (req: Request, res: Response) => {
    try {
        await criarAnexoController(req, res);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.get('/anexo/:id', async (req: Request, res: Response) => {
    try {
        const anexo = await getAnexoControllerById(req, res);
        if (anexo === null) {
            return res.status(404).send('Anexo não encontrado.');
        }
        res.status(200).send(anexo);
    } catch ( error: any ) {
        res.status(500).send(error.message);
    }
});

router.put('/anexo/:id', async (req: Request, res: Response) => {
    try {
        await updateAnexoControllerById(req, res);
    } catch ( error: any ) {
        console.error('Erro na rota', error);
        res.status(500).send(error.message);
    }
});

router.delete('/anexo/:id', async (req: Request, res: Response) => {
    try {
        const result = await deleteAnexoControllerById(req, res);
        res.status(200).send(result);
    } catch (error: any) {
        console.error('Erro na rota', error);
        res.status(500).send(error.message);
    }
});

export default router;