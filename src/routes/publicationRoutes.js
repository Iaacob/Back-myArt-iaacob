import { Router } from "express";
import { createPublication, 
    deletePublication, 
    deletePublicationsFromUser, 
    getLikesFromPublication, 
    getPublicationById, 
    getPublications, 
    getPublicationsByUserId,
    getDislikesFromPublication,
    getPublicationsByUsername,
    getAllDataFromPublications,
    searchPublications} from "../controllers/publicationController";

const router = Router();

router.get('/publicaciones/get', getPublications);

router.get('/publicaciones/:Id', getPublicationById);

router.get('/publicaciones/getPublicationsByUserId/:fkUser', getPublicationsByUserId);

router.post('/publicaciones/username', getPublicationsByUsername);

router.get('/publicaciones/Likes/:fkPublication', getLikesFromPublication);

router.get('/publicaciones/Disikes/:fkPublication', getDislikesFromPublication);

router.get('/publicaciones', getAllDataFromPublications);

router.get('/publicaciones/search/:name', searchPublications);

router.post('/publicaciones', createPublication);

router.delete('/publicaciones/:Id', deletePublication);

router.delete('/publicaciones/getPublicationsByUserId/:fkUser', deletePublicationsFromUser);

// router.put('/publicaciones/:Id', updateUser); (no se si esta bien hacer un update de una publicacion)

export default router;