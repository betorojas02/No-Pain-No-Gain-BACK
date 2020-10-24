import { checkJwt } from './../middlewares/jwt';
import {Router} from 'express'

import {CampusController} from '../controller/CampusController';


const router = Router();

router.post('/' , [checkJwt],CampusController.newSede);

router.get('/city/:id' ,[checkJwt], CampusController.sedesListCuidad);


router.get('/' ,[checkJwt], CampusController.sedesList);


export default router;