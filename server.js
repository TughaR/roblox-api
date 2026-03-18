const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.get("/gamepasses/:userid", async (req, res) => {
    const userId = req.params.userid;

    try {
        const url = `https://games.roblox.com/v1/users/${userId}/gamepasses?limit=50`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo gamepasses" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});