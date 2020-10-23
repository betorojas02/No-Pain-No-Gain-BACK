



import {Router} from 'express'

import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
import {CuidadController} from '../controller/CuidadController';


const router = Router();

router.post('/' , CuidadController.newCity);
router.get('/' , CuidadController.listarCiudad);


export default router;