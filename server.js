const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.get("/gamepasses/:userid", async (req, res) => {
    const userId = req.params.userid;

    try {
        // 🔥 INVENTARIO REAL DEL JUGADOR
        const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?assetType=GamePass&limit=100`;

        const response = await fetch(url);
        const data = await response.json();

        let lista = [];

        if (data && data.data) {
            for (let item of data.data) {
                lista.push({
                    id: item.assetId,
                    name: item.name,
                    price: item.recentPrice || 0
                });
            }
        }

        return res.json({ data: lista });

    } catch (err) {
        console.log("Error:", err.message);
        res.json({ data: [] });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo 🚀");
});
