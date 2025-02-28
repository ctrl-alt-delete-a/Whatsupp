const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Tillåter JSON-data i POST
app.use(cors()); // Tillåter förfrågningar från frontend

// Temporär array för att spara smeknamn
let nicknames = [];

app.post("/save", (req, res) => {
    const nickname = req.body.nickname;
    
    if (!nickname) {
        return res.status(400).json({ message: "Smeknamn krävs" });
    }

    nicknames.push({ nickname }); // Spara i RAM-minnet
    res.json({ success: true, message: "Smeknamn sparat!", nicknames });
});

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
