const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json()); // Tillåter JSON-data i POST
app.use(cors()); // Tillåter förfrågningar från frontend

app.post("/save", (req, res) => {
    const nickname = req.body.nickname;

    // Läs den befintliga JSON-filen
    fs.readFile("json.json", "utf8", (err, data) => {
        let jsonData = [];

        if (!err && data) {
            jsonData = JSON.parse(data); // Om filen finns, läs in datan
        }

        jsonData.push({ nickname: nickname }); // Lägg till nytt smeknamn

        // Spara tillbaka till JSON-filen
        fs.writeFile("json.json", JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                res.status(500).json({ message: "Fel vid sparning" });
            } else {
                res.json({ success: true, message: "Smeknamn sparat!" });
            }
        });
    });
});

app.listen(PORT, () => console.log(`Servern körs på http://localhost:${PORT}`));
