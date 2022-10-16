import { Router } from 'express';

import auth from './authRoute';
import user from './userRoute';
import role from './roleRoute';

const route = Router();

route.use('/auth', auth);
route.use('/user', user);
route.use('/role', role);

export default route;
