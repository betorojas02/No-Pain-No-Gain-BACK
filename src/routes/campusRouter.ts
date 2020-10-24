import {Router} from 'express'

import {CampusController} from '../controller/CampusController';


const router = Router();

router.post('/' , CampusController.newSede);

router.get('/city/:id' , CampusController.sedesListCuidad);


router.get('/' , CampusController.sedesList);


export default router;