
const express = require("express");
const fetch = require("node-fetch");

const app = express();

// 🔥 IMPORTANTE: aceptar JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// 🔥 RUTA GAMEPASSES (CORREGIDA)
app.get("/gamepasses/:userid", async (req, res) => {
    const userId = req.params.userid;

    console.log("Buscando gamepasses de:", userId);

    try {
        const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?assetType=GamePass&limit=100`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error en Roblox API");
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
        res.status(500).json({ data: [] });
    }
});

// 🔥 ESTO ES CLAVE PARA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor corriendo 🚀");
});
