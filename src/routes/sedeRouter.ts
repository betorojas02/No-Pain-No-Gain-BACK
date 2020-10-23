import {Router} from 'express'

import {SedeController} from '../controller/SedeController';


const router = Router();

router.post('/' , SedeController.newSede);

router.get('/:id' , SedeController.sedesList);


export default router;