import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    console.log('Authorization Header:', authHeader); 

    if (!authHeader) return res.status(401).json({ message: 'Access Denied' });
    
    const token = authHeader.split(' ')[1];     

    if (!token) return res.status(401).json({ message: 'Invalid Token Format' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};
