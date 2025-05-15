const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const os = require("os");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

// .env dosyasını yükle
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DESKTOP_PATH = path.join(os.homedir(), "Desktop", "log");

// .env dosyasındaki gizli anahtar ve şifre
const SECRET_KEY = process.env.SECRET_KEY;
const storedHashedPassword = process.env.STORED_PASSWORD_HASH;  // Şifreyi hash'leyip saklayacağız

// Multer için dosya yükleme ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const today = new Date().toLocaleDateString("tr-TR").replaceAll(".", ".");
    const dir = path.join(DESKTOP_PATH, today);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Şifre doğrulama fonksiyonu
async function verifyPassword(password) {
  const match = await bcrypt.compare(password, storedHashedPassword);
  return match;
}

// Mesaj gönderme API'si
app.post("/send", upload.single("file"), (req, res) => {
  console.log("📩 Yeni istek alındı!");
  console.log("📝 Veriler:", req.body);
  if (req.file) {
    console.log("📎 Yüklenen dosya:", req.file.originalname);
  }

  const { text, time, type } = req.body;

  const today = new Date().toLocaleDateString("tr-TR").replace(/\./g, ".");
  const logDir = path.join(DESKTOP_PATH, today);
  const logPath = path.join(logDir, `${today}-logs.csv`);

  try {
    fs.mkdirSync(logDir, { recursive: true });
    console.log("📁 Klasör oluşturuldu:", logDir);

    const messageLine = `${time}; ${type === "file" ? req.file?.originalname : text}\n`;
    fs.appendFileSync(logPath, messageLine, "utf8");
    console.log("📝 Log dosyasına yazıldı:", messageLine);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ HATA:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Şifre doğrulama API'si
app.post("/verify-password", async (req, res) => {
  const { password } = req.body;
  const match = await verifyPassword(password);
  if (match) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3001, () => console.log("🚀 Sunucu çalışıyor: http://localhost:3001"));
