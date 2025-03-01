const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Servera statiska filer från den mapp där din HTML finns
app.use(express.static(path.join(__dirname, "public")));

// Temporär array för att spara smeknamn
let nicknames = [];

app.post("/save", (req, res) => {
    const nickname = req.body.nickname;

    if (!nickname) {
        return res.status(400).json({ message: "Smeknamn krävs" });
    }

    nicknames.push({ nickname }); 
    res.json({ success: true, message: "Smeknamn sparat!", nicknames });
});

// Route för startsidan (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Se till att endast en instans av servern körs
if (require.main === module) {
    app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
}
