const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;
app.use(cors({ origin: '*' }));  // Allows all origins
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());




// 🔹 Increase payload size limit (adjust as needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/EY')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User Schema and Mo
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// ** Recipe Schema and Model **
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    image: { type: String }, // Storing image as a URL or base64 string
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Express JS API with MongoDB!</h1>');
});

// ** User Routes **

// GET all users
app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ status: "200", data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new user
app.post('/adduser', [
    body('username').notEmpty().withMessage('username IS REQUIRED ?'),
    body('email').notEmpty().withMessage('email IS REQUIRED ?'),
    body('password').notEmpty().withMessage('password IS REQUIRED ?'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ data: true, message: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || password !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// DELETE user by ID
app.delete('/deleteuser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: 'User deleted successfully', data: deletedUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ** Recipe Routes **

// GET all recipes
app.get('/getrecipe', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json({ status: "200", data: recipes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new recipe
app.post('/addrecipes', async (req, res) => {
    const { title, ingredients, instructions, image } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            image: image || null,
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully", data: newRecipe });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.delete("/deleterecipe/:id", async (req, res) => {
    try {
      const result = await Recipe.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting recipe", error });
    }
  });
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
