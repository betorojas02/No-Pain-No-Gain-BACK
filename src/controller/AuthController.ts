import {getRepository} from 'typeorm'
import {Request, Response} from 'express'
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';



class AuthController {
    static login = async( req: Request, res:Response) =>{
        const {username,password} = req.body;
        if(!(username && password)){
            res.status(400).json({message:'Usuario y clave requeridos!'});
        }

        const userRepository = getRepository(User);
        let user : User;

        try {
            user = await userRepository.findOneOrFail({where:{username}});
        } catch (e) {
            return res.status(400).json({message:'Usuario o clave incorrectos!'});
        }
        if(!user.checkPassword(password)){
            return res.status(400).json({message:'Usuario o clave incorrectos'});
        }
        
        const token = jwt.sign({userId:user.id,username:user.username},config.jwtSecrete,{expiresIn:'1h'});
        res.json({message:'ok',token , user: user });
    } 
}
export default AuthController;