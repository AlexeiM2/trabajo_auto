const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors')
app.use(cors());
// Configurar middleware para parsear JSON
app.use(express.json());

// Configurar conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema y modelo para los datos del formulario
const quizSchema = new mongoose.Schema({
  nombre: String,
  puntaje: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Ruta POST para recibir datos del formulario
app.post('/api/quiz', async (req, res) => {
  try {
    const { nombre, puntaje } = req.body;

    // Guardar los datos en MongoDB
    const nuevoQuiz = new Quiz({ nombre, puntaje });
    await nuevoQuiz.save();

    res.status(201).json({ message: 'Puntaje guardado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al guardar el puntaje.' });
  }
});

// Iniciar el servidor
const PORT = 4321;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
