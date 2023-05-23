import userModel from '../../database/models/userModel.js';
import AppErr from '../error/AppErr.js';
import { decodeToken } from '../utils/createToken.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  const decoded = decodeToken(token);
  if (!decoded)
    return res.status(401).json({
      status: 'fail',
      message: 'you are not authnticated please log in --> /login',
    });
  const user = await userModel.findOne({ _id: decoded.id });

  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: 'invalid token',
    });
  } else {
    req.user = user;
    next();
  }
};

export const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) next(new AppErr('not authorized', 402));
    next();
  };
};
