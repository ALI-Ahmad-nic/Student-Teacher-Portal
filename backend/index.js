const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const mysecret = "thisiskey12345";



mongoose.connect("mongodb://localhost:27017/myapp", {
   
});
const db = mongoose.connection;

/// Handle MongoDB connection error
db.on("error", function(error) {
    console.error("MongoDB connection error:", error);
});

// Handle MongoDB connection success
db.once("open", function() {
    console.log("Connected to MongoDB");
});

// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
});
const stSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    address: String,
    CGPA: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add userId field
});
const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", stSchema);

   
//  user Registration 
app.post("/api/register", async (req, res) => {
    const { username, email } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const user = new User({ username, email });
        await user.save();
        res.json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// user login 
app.post("/api/login", async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findOne({ username, email });
        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, mysecret, { expiresIn: '1h' });
        res.json({ token }); // Send JWT token to client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// token verification and decoding 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    console.log("header" + bearerHeader)
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        console.log("token" + bearerToken);
        jwt.verify(bearerToken, mysecret, (err, decodedToken) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                // console.log('Decoded Token:', decodedToken);
                req.userId = decodedToken.userId;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}



// student registration 
app.post("/api/stregister", verifyToken, async (req, res) => {
    const stdata = req.body;
    stdata.userId = req.userId;
    // console.log(stdata);

    try {
        const existingStudent = await Student.findOne(stdata);
        if (existingStudent) {
            return res.status(400).json({ message: "Student already registered" });
        }

        const st = new Student(stdata);
        await st.save();
        res.json({ message: "Student registered successfully", st });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// getstudents
app.get("/api/students",verifyToken, (req, res) => {
    console.log('UserID:', req.userId); // Add this line
    Student.find({ userId: req.userId })
        .then(contacts => res.json(contacts))
        .catch(err => res.status(500).send(err));
});

// delete a student 
app.delete("/api/deletestudent/:id",(req,res)=>{
console.log(req.params.id)
Student.findByIdAndDelete(req.params.id)
.then(contact=> res.json(contact))
.catch(error=> res.send(error))
})

// upadte student data 
app.put("/api/updatestudent/:id",(req,res)=>{
console.log(req.params.id)
Student.findByIdAndUpdate(req.params.id,req.body, { new: true })
.then(contact=>{
    if(!contact) return res.status(404).send({message: "not found"})
    res.json(contact);
})
.catch(error=> res.send(error))
})


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});













