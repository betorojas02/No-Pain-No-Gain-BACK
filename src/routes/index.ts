import {Router} from 'express'
import  auth from './auth'
import user from './user'

import ciudadRoutes from './cityRoute'

import sedeRoutes from './campusRouter'


const routes = Router();

routes.use('/auth',auth);
routes.use('/users',user);

routes.use('/city', ciudadRoutes);

routes.use('/campus', sedeRoutes);

export default routes;