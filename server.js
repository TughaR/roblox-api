
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.get("/gamepasses/:userid", async (req, res) => {
    const userId = req.params.userid;

    try {
        console.log("Buscando gamepasses de:", userId);

        const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?assetType=GamePass&limit=100`;

        const response = await fetch(url);

        // 🔥 SI ROBLOX FALLA → no romper
        if (!response.ok) {
            console.log("Roblox respondió mal:", response.status);

            return res.json({ data: [] }); -- 🔥 NUNCA 500
        }

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

        console.log("Total encontrados:", lista.length);

        res.json({ data: lista });

    } catch (err) {
        console.log("ERROR:", err.message);

        -- 🔥 NUNCA romper la API
        res.json({ data: [] });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor corriendo 🚀");
});
