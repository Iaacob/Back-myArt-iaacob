import { Router } from "express";
import {prueba} from '../controllers/pruebaController.js'

const router = Router();

router.get('/prueba/:Id', prueba);

export default router;