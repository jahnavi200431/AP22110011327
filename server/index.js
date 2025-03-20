require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get("/api/users", async (req, res) => {
    try {
        const response = await fetch("http://20.244.56.144/test/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "clientID": CLIENT_ID,
                "clientSecret": CLIENT_SECRET,
            },
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
