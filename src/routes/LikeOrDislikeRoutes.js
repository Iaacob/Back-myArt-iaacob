import { Router } from "express";
import { getLikes, 
         getDislikes, 
         insertLike, 
         insertDisLike, 
         updateToLike, 
         updateToDislike,
         deleteLike, 
         getLikesfromUser,
         getDislikesfromUser } from "../controllers/likeOrDislikeController";

const router = Router();

router.get('/likesOrDislikes/likes', getLikes);

router.get('/likesOrDislikes/dislikes', getDislikes);

router.post('/likesOrDislikes/likes/user', getLikesfromUser);

router.post('/likesOrDislikes/dislikes/user', getDislikesfromUser)

router.post('/likesOrDislikes/likes', insertLike);

router.post('/likesOrDislikes/dislikes', insertDisLike);

router.put('/likesOrDislikes/likes', updateToLike);

router.put('/likesOrDislikes/dislikes', updateToDislike);

router.delete('/likesOrDislikes', deleteLike);

// router.delete();

export default router;