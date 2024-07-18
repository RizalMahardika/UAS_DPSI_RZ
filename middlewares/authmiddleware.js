const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    async (req, res, next) => {
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        const user = await User.findById(req.user.id);
        if (!user || (roles.length && !roles.includes(user.role))) {
          return res.status(403).send({ message: 'Access denied. Unauthorized user.' });
        }

        req.user = user;
        next();
      } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
      }
    }
  ];
};

module.exports = authMiddleware;
