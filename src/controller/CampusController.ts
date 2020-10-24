

import {Request, Response} from 'express';
import {Cuidad} from '../entity/Cuidad';
import {getRepository} from 'typeorm';
import {Sede} from '../entity/Sedes';
import {User} from '../entity/User';


export class CampusController{


    static newSede = async (req:Request, res:Response) => {

        const {name , cuidad} = req.body;


        const sede = new Sede();

        sede.nombreSede = name;

        const cuidadRepository = getRepository(Cuidad);

        const ciudadRespository = await cuidadRepository.findOneOrFail(cuidad);

        sede.cuidad  = ciudadRespository;




        const sedeRepository = getRepository(Sede);

        try{

            sedeRepository.save(sede);
            res.status(200).json({message:'ok'});
        }catch (e) {
            return res.status(500).json({message:'error al guardar'});
        }
    }

    static sedesList = async(req:Request,res:Response) => {
        const {id} = req.params;

        console.log('ayudaaaaaaaaaaaaaaaaaaa' +id);

        const s = await getRepository(Cuidad);
        try {
            const sede = await s.find({
                relations : [ "sede"] ,where: [
                    { id : id}
                ]
            });
            res.send(sede);
        } catch (error) {
            console.log(error);
            res.status(404).json({message:'No Tiene resultados'});
        }
    }
}