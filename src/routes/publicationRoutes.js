import { Router } from "express";
import { createPublication, 
    deletePublication, 
    deletePublicationsFromUser, 
    getLikesFromPublication, 
    getPublicationById, 
    getPublications, 
    getPublicationsByUserId,
    getDislikesFromPublication,
    getPublicationsByUsername } from "../controllers/publicationController";

const router = Router();

router.get('/publicaciones', getPublications);

router.get('/publicaciones/:Id', getPublicationById);

router.get('/publicaciones/getPublicationsByUserId/:fkUser', getPublicationsByUserId);

router.post('/publicaciones/username', getPublicationsByUsername);

router.get('/publicaciones/Likes/:fkPublication', getLikesFromPublication);

router.get('/publicaciones/Disikes/:fkPublication', getDislikesFromPublication);

router.post('/publicaciones', createPublication);

router.delete('/publicaciones/:Id', deletePublication);

router.delete('/publicaciones/getPublicationsByUserId/:fkUser', deletePublicationsFromUser);

// router.put('/publicaciones/:Id', updateUser); (no se si esta bien hacer un update de una publicacion)

export default router;