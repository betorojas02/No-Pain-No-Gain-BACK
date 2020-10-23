
import {Router} from 'express'
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();

//Get all Users
router.get('/',[checkJwt],UserController.getAll);

//Get one Users
router.get('/:id',[checkJwt],UserController.getById);

//Get new User
router.post('/',UserController.newUser);


//edit new User
router.patch('/:id',[checkJwt],UserController.editUser);

//delete
router.delete('/:id',[checkJwt],UserController.deleteUser);


//create User Gym
router.post('/createUserGym',[checkJwt],UserController.createUserGym);


router.get('/getuser/userall',UserController.dataUser);

export default router;