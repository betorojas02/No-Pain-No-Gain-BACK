



import {Router} from 'express'

import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
import {CityController} from '../controller/CityController';


const router = Router();

router.post('/' , CityController.newCity);
router.get('/' , CityController.listarCiudad);


export default router;