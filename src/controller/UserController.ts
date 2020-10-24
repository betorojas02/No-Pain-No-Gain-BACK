import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';
import {Sede} from '../entity/Sedes';
import {UserToSede} from '../entity/UserToSede';
export class UserController {
     

    static getAll = async (req:Request, res:Response) => {
            
        const userRepository = getRepository(User);
        let users;
        try {
            users = await userRepository.find();
        } catch (error) {
            res.status(404).json({message:'No Tiene resultados'});
        }
        res.send(users);
        
    }

    static getById = async(req:Request,res:Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({message:'No Tiene resultados'});
        }
    }

    static newUser = async (req:Request,res:Response) => {
        const {username,cedula,password,sedesave , apellido , email} = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.cedula = cedula;
        user.apellido = apellido;
        user.email = email;


        //validate
        const errors = await validate(user);
        if(errors.length>0){
            const errors = await validate(user,{validationError:{target:false,value:false}});
            return res.status(400).json(errors);
        }

        ///TODO HASH PASSWORD

        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            await userRepository.save(user);

            const userToSede = new UserToSede();

            const sedeRepository = getRepository(Sede);
            const sede = await sedeRepository.findOneOrFail(sedesave);

            userToSede.user = user;
            userToSede.sede = sede;

            const usertosede =getRepository(UserToSede);
            await usertosede.save(userToSede);




        } catch (error) {
            console.log(error);
            return res.status(409).json({message:'Usuario ya existe'})
        }
            // all ok
        res.send(user);
    }
 
    static editUser = async (req:Request, res:Response) => {
        let user;
        const {id} = req.params;
        const {username, role} = req.body;

        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id) 
            user.username = username;
            user.role = role;
        } catch (error) {
            res.status(404).json({message:'User not found'});
        }

        const errors = await validate(user,{validationError:{target:false,value:false}});
        if(errors.length>0){
            return res.status(400).json({errors});
        }

        //Try to save user

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({message:'Username already in use'});
        }
        res.status(201).json({message:'User Update'});
    }

    static deleteUser = async (req:Request, res:Response) => {
        const {id} = req.params;
        let user : User;
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({message:'User not found'});
        }

        userRepository.delete(id);
        res.status(201).json({message:'user Delted!'})
        
    }

    static createUserGym = async  (req:Request , res:Response) => {

        let sedes;
        const {usersave , sedesave} = req.body;

        const userToSede = new UserToSede();
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(usersave);

        const sedeRepository = getRepository(Sede);
        const sede = await sedeRepository.findOneOrFail(sedesave);

        userToSede.user = user;
        userToSede.sede = sede;

        const usertosede =getRepository(UserToSede);
        try{

            await usertosede.save(userToSede);
        }  catch (error) {

            console.log(error);
        return res.status(400).json({message:'Tiene un error'});
    }

        res.status(200).json({message:'ok!'})

    }

    static dataUser = async (req:Request , res:Response) => {

        const {id} = req.params;

        try{
            // const questionRepository = getRepository(User);
            // const questions = await questionRepository.find({ relations: ["sede"] });
            const result = await getRepository(User)
                .createQueryBuilder("user").leftJoinAndSelect("user.sede" , "sede").leftJoinAndSelect("sede.sede" , "nombresede").
                where("nombresede.id = " + id).
                leftJoinAndSelect("nombresede.cuidad" , "ciudad")
                // .where("user.cedula = :cedula", { cedula: "1018477870" })
                .getMany();

            return         res.send(result);
        }catch (e) {
            console.log(e);
            return res.status(400).json({message:e});
        }

        // const questionRepository = getRepository(UserToSede);


        // const questions = await questionRepository.find({ relations: ["user" , "sede"] });



    }


   

}

export default UserController;