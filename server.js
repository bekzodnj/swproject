const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');
const stripe = require('stripe')('sk_test_8u4lx6sxZZsiwVwCevgjx6wf00XPIWNkXF');
const { v4: uuidv4 } = require('uuid');

const app = express();

connectDB();

// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// mapping to main
app.get('/', (req, res) => {
  res.send('API is running');
});

// Stripe Payment
// POST /checkout
app.post('/checkout', async (req, res) => {
  console.log('Request:', req.body);

  let error;
  let status;
  try {
    const { course, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: course.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${course.name}`,
      },
      {
        idempotency_key,
      }
    );
    console.log('Charge:', { charge });
    status = 'success';
  } catch (error) {
    console.error('Error:', error);
    status = 'failure';
  }

  res.json({ error, status });
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

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
