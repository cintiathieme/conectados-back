const Users = require('../models/User');
const passwordManager = require('../utils/password.utils');
const jwtManager = require('../utils/jwt.utils');

class AuthController {
    constructor () {
        this.Users = Users;
        this.passwordManager = passwordManager;
    }

    signup = async (req, res, next) => {
        try {
            const userFromDb = await this.Users.findOne( { email: req.body.email });
            
            if (userFromDb) {
                return res.status(400).json( { message: 'Email já cadastrado'})
            }

            const encryptedPassword = this.passwordManager.encrypt(req.body.password);

            const newUser = new this.Users({ ...req.body, password: encryptedPassword });

            await newUser.save();

            res.status(201).json({ message: 'Novo usuário cadastrado' });
        } catch (error) {
            console.log(error)
        }
    }

    signin = async (req, res, next) => {
        try {
            const userFromDb = await this.Users.findOne( { email: req.body.email });

            if (!userFromDb) {
                return res.status(400).json( { message: 'Credenciais inválidas'})
            }
            
            const isPasswordValid = passwordManager.verify(req.body.password, userFromDb.password);

            if(!isPasswordValid) {
                return res.status(400).json( { message: 'Credenciais inválidas'})
            }

            const token = jwtManager.generateAuthToken(userFromDb);
            const role = userFromDb.role;

            res.status(200).json({ message: token, role: role });
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = new AuthController();