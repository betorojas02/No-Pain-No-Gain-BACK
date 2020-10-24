



import {Router} from 'express'


import { checkRole } from '../middlewares/role';
import {CityController} from '../controller/CityController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.post('/' ,[checkJwt], CityController.newCity);
router.get('/' , CityController.listarCiudad);


export default router;