const express = require('express');
const app = express();
const connectDB = require('./db/db');
const auth = require('./middleware/auth');
const routes = require('./routes');

// Use Middleware..
app.use(express.json());

// Use ENV PORT or default..
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// Make Connection and backend server response..
connectDB('mongodb://localhost:27017/attendance-system-db')
	.then(() => {
		console.log('Database is connected!');

		// listening server..
		app.listen(PORT, HOST, () => {
			console.log(`Server is now running on http://${HOST}:${PORT}`);
		});
	})
	.catch((error) => {
		console.log('ERR! Can\'t Connected with Database! --> ', error.message);
	});

// Use the Routes..
app.use(routes);



app.get('/api/public', function (_req, res) {
	// Public route...
	return res.status(200).json({ message: 'I am Public Route!' });
});

app.get('/api/private', auth, function (req, res) {
	console.log('I am the user ', req.user);
	return res.status(200).json({ message: 'I am a private route' });
});

// Error Handling Middleware..
app.use((error, _req, res, _next) => {
	console.log(error);

	const message = error.message ? error.message : 'Server Error Occured!';
	const status = error.status ? error.status : 500;
	res.status(status).json({ message });
});
