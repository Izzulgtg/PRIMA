const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth-routes'); // Import route auth
const adminRoutes = require('./src/routes/admin-routes'); // Import route admin
const dokterRoutes = require('./src/routes/dokter-routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL Server Frontend Vite tim kalian
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Daftarkan API Routing PRIMA di sini
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PRIMA Backend API Server' });
});

app.listen(PORT, () => {
  console.log(`Server backend PRIMA berjalan lancar di port ${PORT}`);
});

// Pasang base URL untuk rute admin
app.use('/api/admin', adminRoutes);

app.use('/api/dokter', dokterRoutes);