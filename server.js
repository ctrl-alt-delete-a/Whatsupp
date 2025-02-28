const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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

// Se till att endast en instans av servern körs
if (!module.parent) {
    app.get("/", (req, res) => {
        res.send("Servern fungerar! 🚀");
    });    
    const path = require("path");

// Servera statiska filer från den mapp där din HTML finns
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
    app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
}
