import express from 'express';
import mysql2 from 'mysql2'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],
        credentials: true
    }
))
app.use(cookieParser())

const key = 10

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'app',
    password: 'manoj'
}).promise();

var uname = '';
const userVerify = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ Error: "Not Authenticated" })
    }
    else {
        jwt.verify(token, "secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not Avail" })
            }
            else {
                req.name = uname
                next()
            }
        })
    }
}

app.get('/', userVerify, (req, res) => {

    return res.json({ Status: "Success", name: req.name })
})


app.get('/admin', userVerify, (req, res) => {

    return res.json({ Status: "Success", name: req.name })
})

app.get('/user', userVerify, (req, res) => {

    return res.json({ Status: "Success", name: req.name })
})

app.post('/register', async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password !== cpassword) {
        return res.status(400).send({ message: "Passwords do not match!" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, key);
        const [result] = await pool.execute(
            "INSERT INTO login (username, email, password, cpassword) VALUES (?, ?, ?, ?)",
            [username, email, hashedPassword, hashedPassword]
        );
        console.log("affectedRows = " + result.affectedRows)
        if (result) {
            console.log("insert id = " + result.insertId)
            return res.json({ Status: "Success" })
        } else {
            res.status(400).send({ message: "Error during registration!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Server error", error: "err.message " });
    }
});



app.post('/login', async (req, res) => {
    const sql = 'SELECT * FROM login WHERE username = ?';

    try {
        const [data] = await pool.execute(sql, [req.body.username]);


        if (data.length > 0) {
            const { username, email } = data[0]
            console.log("user == " + username)
            const passwordMatched = await bcrypt.compare(req.body.password, data[0].password);

            if (passwordMatched) {
                console.log("\nemail == " + email)
                const name = data[0].name
                uname = username
                const token = jwt.sign({ name }, "secret-key", { expiresIn: '1d' })
                res.cookie('token ', token)
                return res.json({ Status: "Success" })
            } else {
               
                return res.status(400).json({ error: "Password does not match!" });
            }
        }

        else {
            flag = true
            return res.status(404).json({ error: "No user found!" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: "Success" })
})

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
});
