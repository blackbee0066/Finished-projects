import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import dotenv from "dotenv";

const app = express();
const port = 5500;

//dotenv cconfig
dotenv.config();


// Connecting to PostgreSQL database
const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });



// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let initialPath = path.join(__dirname, "public");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(initialPath));


//session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    }
      
}));



// Routes to serve static pages
app.get("/", (req, res) => {
    res.sendFile(path.join(initialPath, "Home.html"));
});


app.get("/news", (req, res) => {
    res.sendFile(path.join(initialPath, "news.html"));
});

app.get("/sports", (req, res) => {
    res.sendFile(path.join(initialPath, "sports.html"));
});

app.get("/business", (req, res) => {
    res.sendFile(path.join(initialPath, "Business.html"));
});

app.get("/entertainment", (req, res) => {
    res.sendFile(path.join(initialPath, "Entertainment.html"));
});


//Check login session 
app.get('/session-check', (req, res) => {
    if(req.session.user) {
        res.json({loggedIn: true, user: req.session.user});
    }
    else{
        res.json({loggedIn: false});
    }
});


//=============Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({message: "logged out successful"})
    });
});


    app.get('/get-comments', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT c.comment_text, c.created_at, 
                u.surname || ' ' || u.other_names AS full_name
            FROM comments c
            JOIN users u ON c.user_id = u.id
            ORDER BY c.created_at DESC
            LIMIT 50
        `);
        
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
    });




    //==============ALL POST ROUTES


//Handling a login check

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        console.log("Looking for user:", email);
        console.log("Entered password (raw):", password);

        if (!user) {
            console.log("❌ No user found");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log("✅ User found:", user.email);
        console.log("Stored hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("❌ Password does not match");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const full_name = `${user.surname} ${user.other_names}`;
        console.log("✅ Login successful");

        req.session.userId = user.id;
        res.json({
            message: 'Login successful',
            user_id: user.id,
            full_name
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//=======REGISTRATION POST-REQUEST

app.post("/register", async (req, res) => {
    const {
        surname,
        "other-names": otherNames,
        email,
        password,
        phone,
        dob,
        gender,
        terms
    } = req.body;
    
    if (!surname || !otherNames || !email || !password || !dob || !gender || terms !== 'yes') {
        return res.status(400).json({ message: "All required fields must be filled and terms accepted." });
        }
    
    try {
        // Check for existing user
        const existingUser = await db.query("SELECT 1 FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already registered. Please log in." });
        }
    
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert user
        await db.query(
            `INSERT INTO users (surname, other_names, email, password, phone, dob, gender, terms)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [surname, otherNames, email, hashedPassword, phone, dob, gender, terms]
        );
    
        res.status(201).json({ message: "User registered successfully" });
    
    }
    catch (error) {
        console.error("Registration error:", error); // Log full error for diagnosis

        res.status(500).json({ message: "Server error during registration" });
    }
});
    

app.post('/post-comment', async (req, res) => {
    const { comment_text, userId, fullName } = req.body;

    if (!comment_text || !userId || !fullName) {
        return res.status(403).json({ error: 'Unauthorized attempt to post comment' });
    }

        //console.log("📝 Posting comment:", { comment, userId, fullName });


    try {
        const result = await db.query(
            'INSERT INTO comments (comment_text, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING comment_text, created_at',
            [comment_text, userId]
          
          
          
          
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting comment:', err);
        res.status(500).json({ error: 'Failed to post comment' });
    }
});


//============REACTION ON COMMENTS----RESERVED FOR FUTURE PROPER UPDATE
app.post('/api/comments/:id/react', async (req, res) => {
    const userId = req.session.userId;
    const commentId = req.params.id;
    const { reactionType } = req.body; // 'like' or 'dislike'

    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    try {
        const existing = await db.query(
            'SELECT * FROM comment_reactions WHERE user_id = $1 AND comment_id = $2',
            [userId, commentId]
        );

        if (existing.rows.length > 0) {
            const existingType = existing.rows[0].reaction_type;
            if (existingType === reactionType) {
                // Toggle off (remove reaction)
                await db.query(
                    'DELETE FROM comment_reactions WHERE user_id = $1 AND comment_id = $2',
                    [userId, commentId]
                );
            } else {
                // Update reaction
                await db.query(
                    'UPDATE comment_reactions SET reaction_type = $1 WHERE user_id = $2 AND comment_id = $3',
                    [reactionType, userId, commentId]
                );
            }
        } else {
            // New reaction
            await db.query(
                'INSERT INTO comment_reactions (user_id, comment_id, reaction_type) VALUES ($1, $2, $3)',
                [userId, commentId, reactionType]
            );
        }

        // ✅ Fetch updated like/dislike counts
        const counts = await db.query(
            `SELECT 
                COUNT(*) FILTER (WHERE reaction_type = 'like') AS likes,
                COUNT(*) FILTER (WHERE reaction_type = 'dislike') AS dislikes
            FROM comment_reactions
            WHERE comment_id = $1`,
            [commentId]
        );

        const { likes, dislikes } = counts.rows[0];

        return res.json({
            status: 'success',
            likes: parseInt(likes),
            dislikes: parseInt(dislikes)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);


// Connect to database and start server
db.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL database');

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database:', err);
  });
