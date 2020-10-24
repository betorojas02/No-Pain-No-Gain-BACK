import {Router} from 'express'

import {CampusController} from '../controller/CampusController';


const router = Router();

router.post('/' , CampusController.newSede);

router.get('/:id' , CampusController.sedesList);


export default router;