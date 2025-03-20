import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_BASE_URL = "http://20.244.56.144/test";

// Fetch Users
app.get("/api/users", async (req, res) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: {
                "Content-Type": "application/json",
                "clientID": CLIENT_ID,
                "clientSecret": CLIENT_SECRET,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Fetch Posts
app.get("/api/posts", async (req, res) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                "Content-Type": "application/json",
                "clientID": CLIENT_ID,
                "clientSecret": CLIENT_SECRET,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Start Proxy Server
app.listen(5000, () => console.log("Proxy server running on port 5000"));
