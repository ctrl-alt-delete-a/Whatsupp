const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// MongoDB URI
const uri = "mongodb+srv://new77524:eTMvNx4J-Q9hvY_@cluster0.9a6wy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Ansluten till MongoDB!");
    } catch (error) {
        console.error("❌ Fel vid anslutning:", error);
    }
}
connectDB();

// Hämtar rätt databas och collection
const db = client.db("WhatsuppDB"); // Byt ut detta till ditt eget DB-namn
const collection = db.collection("nicknames"); // Collection för att lagra smeknamn

// Route för att spara ett smeknamn
app.post("/save", async (req, res) => {
    const nickname = req.body.nickname;
    if (!nickname) {
        return res.status(400).json({ message: "Smeknamn krävs" });
    }

    try {
        await collection.insertOne({ nickname });
        res.json({ success: true, message: "Smeknamn sparat!" });
    } catch (error) {
        res.status(500).json({ message: "Fel vid sparning" });
    }
});

// Route för att hämta alla smeknamn
app.get("/nicknames", async (req, res) => {
    try {
        const nicknames = await collection.find().toArray();
        res.json(nicknames);
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av smeknamn" });
    }
});

// Servera statiska filer (HTML, CSS, JS)
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Starta servern
app.listen(PORT, () => console.log(`🚀 Servern körs på port ${PORT}`));
