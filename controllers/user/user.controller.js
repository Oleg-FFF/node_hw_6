const {userService} = require('../../services')
const {hashPassword, checkHashPassword} = require('../../helpers')
const ErrorHandler = require('../../error/ErrorHandler')

module.exports = {
    getAllUsers: async (req, res) => {
        let users = await userService.getUsers();

        res.json(users)
    },

    getUserByParams: async (req, res) => {
        let params = req.params;
        let user = await userService.getUserByParams(params);

        res.json({user})
    },

    updateUser: async (req, res) => {
        const data = req.body;
        const params = +req.params.name;
        const updProd = await userService.updateUser(params, data);

        res.json({updProd})

    },

    deleteUser: async (req, res) => {
        const userId = +req.params.id;
        let deletedUser = await userService.deleteUser(userId);

        res.json({deletedUser})
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            const hashedPassword = await hashPassword(user.password)

            user.password = hashedPassword;

            let newUser = await userService.createUser(user);

            return res.json({newUser})
        } catch (e) {
            res.json(e)
        }
        res.end()
    },

    loginUser: async (req, res, next) => {

        const {email, password} = req.body;
        const user = await userService.getUserByParams({email});

        if (!user) {
            return next(new ErrorHandler('User is not found', 404, 4041));
        }

        await checkHashPassword(user.password, password);

        res.json(user);
    }
};
