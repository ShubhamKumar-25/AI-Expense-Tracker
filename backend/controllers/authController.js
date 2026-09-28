const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    try {
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if(existingUser.length > 0){
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Save user
        const [result] = await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)",
            [name, email, hashPassword]
        );

        // Create jwt Token 
        const token = jwt.sign({ id: result.insertId}, process.env.JWT_SECRET || "supersecretkey", {
            expiresIn: "24h",
        });
        res.status(200).json({
            message: "User registered Successfully",
            token,
            user: { id: result.insertId, name, email },
        });
    } catch (error) {
        console.error("Register Error", error);
        res.status(500).json({
            message: "Server error during registration"
        });
    }
}


// user Login
exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Please provide email and password"
        });
    }
    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if(users.length === 0){
            return res.status(400).json({
                message: "Invalid credential"
            });
        }
        const user = users[0];

        // verify password 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credential"
            });
        }

        // Token generate
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET || "supersecretkey", {
            expiresIn: "24h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({
            message: "Server error during Login"
        });
    }
}
