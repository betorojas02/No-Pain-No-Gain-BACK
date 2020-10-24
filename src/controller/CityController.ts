import {Request, Response} from 'express';
import {Cuidad} from '../entity/Cuidad';
import {getRepository} from 'typeorm';
import {User} from '../entity/User';


export class CityController {


    static newCity = async (req:Request, res:Response) => {

        const {name} = req.body;


        const city = new Cuidad();

        city.nombreCuidad = name;


        const cuidadRepository = getRepository(Cuidad);

        try{

            cuidadRepository.save(city);
            res.status(200).json({message:'ok'});
        }catch (e) {
            return res.status(500).json({message:'error al guardar'});
        }



    }

    static listarCiudad = async (req:Request, res:Response) => {


        const cuidadRepository = getRepository(Cuidad);
        let users;
        try {
            users = await cuidadRepository.find();
        } catch (error) {
            res.status(404).json({message:'No Tiene resultados'});
        }
        res.send(users);



    }
}