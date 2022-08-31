const { loginService, registerService } = require('../service/auth');

async function registerController (req, res, next) {
	const { name, email, password } = req.body;

    // validation..
	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Invalid User!' });
	}

	try {
		const user = await registerService({ name, email, password });
        return res.status(201).json({ message: 'User Registered Successfully!', user });
	} catch (error) {
		// Passing Error to Error Middleware..
		next(error);
	}
}

async function loginController (req, res, next) {
	const { email, password } = req.body;

	try {
		const token = await loginService({ email, password });
        return res.status(200).json({ message: 'Login Successful.', token });
	} catch (error) {
		next(error);
	}
}

module.exports = {
    loginController,
    registerController,
};