import { Router } from "express";
import { getUsers, createUser, getUserById, deleteUser, updateUser, login, getUserByUsername } from "../controllers/userController";
import 'dotenv/config'
import jwt  from "jsonwebtoken";
import { token } from "morgan";

const router = Router();

router.get('/usuarios', getUsers);

router.get('/usuarios/:Id', getUserById);

router.post('/usuarios/usuario', getUserByUsername);

router.post('/usuarios/login', async(req,res) =>{

    try {
        const {username, password} = req.body
        const logedUser = await login(username,password)

        if (logedUser == null) return res.send('Usuario o contraseña incorrectos, vuelva a intentar');

        jwt.sign({user: logedUser}, process.env.SECRETKEY,(err, token)=>{
            res.send(
                res.json({
                    token: token
                })
            )
        });



    } catch (error) {
        console.log(error)
    }

})

router.post('/usuarios/register', createUser);

router.delete('/usuarios/:Id', deleteUser);

router.put('/usuarios/:Id', updateUser);

export default router;