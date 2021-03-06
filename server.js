const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

require('dotenv').config();

//
connectDB(process.env.MONGO_URI);

// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// mapping to main
app.get('/', (req, res) => {
  res.send('API is running');
});

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/studentProfile', require('./routes/api/studentProfile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/schedule', require('./routes/api/schedule'));

app.use('/api/services', require('./routes/api/services'));
app.use('/api/blogpost', require('./routes/api/blogPost'));
app.use('/api/enrolled', require('./routes/api/enrolled'));
app.use('/api/students', require('./routes/api/studentRegister'));
app.use('/api/studentsAuth', require('./routes/api/studentsAuth'));

// get deployment port or default
const PORT = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
