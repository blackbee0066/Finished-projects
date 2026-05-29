import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pool";
import bcrypt from "bcrypt";


const app = express();
const port = 4500;

// connecting server to database

const db = new pg.Pool({
    host: "localhost",
    database: "LOGINFORM",
    user: "postgres",
    password: "blackbee98",
    port: 5432
});
db.connect();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let initialPath = path.join(__dirname, "public");

// Make the public folder a static path
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(initialPath, "Index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(initialPath, "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
});


app.post("/register-user", async (req, res) => {
    console.log("Received register request:", req.body); // Debugging log

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Fill all fields" });
    }

    try {
        console.log(`Checking if user ${email} already exists...`); // Debugging log
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "User already exists!" });
        }

        console.log("Hashing password..."); // Debugging log
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Inserting user into database..."); // Debugging log
        const userResult = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        console.log("User registered successfully:", userResult.rows[0]); // Debugging log
        res.status(201).json({ message: "User registered successfully!", user: userResult.rows[0] });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = existingUser.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // ✅ Send user name in the response
        res.status(200).json({ message: "Login successful", user: { name: user.name } });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
