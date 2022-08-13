import express from 'express'
import config from './config'
import userRoutes from './routes/userRoutes'
import publicationRoutes from './routes/publicationRoutes'
import commentRoutes from './routes/commentsRoutes'
import likeOrDislikeRoutes from './routes/likeOrDislikeRoutes'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import  prueba  from './routes/pruebaRoutes'
 
const app = express();

app.set('port', config.port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://192.168.0.56:4000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  }
);

const verifyToken =(req,res,next)=>{
  const token = req.headers['authorization'];
  let tokenSolo = null;
  if(typeof token !== 'undefined'){
    const tokenArray = token.split(' ');
    tokenSolo = tokenArray[1];
  } 
  else{
    res.sendStatus(403)
  }

  jwt.verify(tokenSolo, process.env.SECRETKEY, (err) => {
    if(err){
      console.log('paso 4: ',tokenSolo);
      res.status(403).json(err);
    }
    else{
      console.log(tokenSolo);
      next();
    }
  });
}

app.use(prueba)
app.use(userRoutes);
app.use(verifyToken, publicationRoutes);
app.use(verifyToken, commentRoutes);
app.use(verifyToken, likeOrDislikeRoutes);

export default app