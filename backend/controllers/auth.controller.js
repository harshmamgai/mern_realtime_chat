import express from 'express';

// No need to create a new express app here
// Remove: const app = express();

// Use bodyParser to parse JSON in the request body
const bodyParser = express.json();
export const Signup = async (req, res) => {
    try {
        const { fullname } = req.body;

        if (!fullname) {
            return res.status(400).json({ error: "Missing 'fullname' in the request body" });
        }

        console.log(`Received name: ${fullname}`);
        res.json({ message: `Received name: ${fullname}` });
    } catch (err) {
        console.error("Error in signup controller:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const Login = (req, res) => {
    try {
        const gender = req.body.gender;

        if (!gender) {
            return res.status(400).json({ error: "Missing 'gender' in the request body" });
        }

        console.log(`Received gender: ${gender}`);
        res.send("Got you");
    } catch (err) {
        console.error("Error in login controller:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const Logout = (req, res) => {
    res.send("Logout user");
    console.log("Logout User");
};

// No need to listen to a port here
// Remove: const port = 3000; app.listen(port, () => { console.log(`Server is running on port ${port}`); });
