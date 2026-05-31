const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const signup = async(req, res)=>{
    try{
        const {name,email,password,phone} = req.body

        // Basic validation
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //Check if user already exist
        const fetch_query = 'Select * from users Where email = $1 OR phone = $2'

        const userexits = await pool.query(fetch_query,[email,phone]);

        if(userexits.rows.length>0){
            return res.status(400).json({message: "User already exist"})
        }

        // Hash password
        const hashedpassword = await bcrypt.hash(password,10);

        // Insert into DB
        const fetch_query2 = 'INSERT INTO users(name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING *'

        const newUser = await pool.query(fetch_query2,[name,email,hashedpassword,phone])

        // send response
        res.status(201).json({
            message: "User created successfully",
            user: newUser.rows[0]
        })
        
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const fetch_query = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(fetch_query, [email]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
    message: "Login successful",
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    }
});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT id, name, email, phone, created_at
            FROM users
            WHERE id = $1
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { signup, login, getProfile }