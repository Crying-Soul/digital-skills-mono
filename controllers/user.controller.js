
const User = require('../models/User');

class UserController {

    async login(req, res){
        try {
            res.render('login')
            
        } catch (error) {
            console.log(error);
            res.render('index')
            return;
        }
    }
    async profile(req, res){
        try {
            const token = req.query.token
            if (!token){
                res.status(401).render('index');
                return;
            }
            const user = await User.findByToken(token);
            console.log(user);
            if (!user){
                res.status(401).render('index');
                return;
            }
            res.render('profile', {user: user});
            
        } catch (error) {
            console.log(error);
            res.render('index');
            return;
        }
    }

}

module.exports = new UserController();