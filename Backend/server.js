const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth-routes'); // Import route auth
const adminRoutes = require('./src/routes/admin-routes'); // Import route admin
const dokterRoutes = require('./src/routes/dokter-routes');
const pasienRoutes = require('./src/routes/pasien-routes');
const consultationRoutes = require('./src/routes/consultation-routes');

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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PRIMA Backend API Server' });
});

// Daftarkan API Routing PRIMA di sini
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dokter', dokterRoutes);
app.use('/api/pasien', pasienRoutes);
app.use('/api/consultations', consultationRoutes);

app.listen(PORT, () => {
  console.log(`Server backend PRIMA berjalan lancar di port ${PORT}`);
});