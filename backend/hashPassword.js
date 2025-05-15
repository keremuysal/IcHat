const bcrypt = require("bcrypt");

// Hash'lemek istediğiniz şifre
const password = "letmein";

// Bcrypt ile şifreyi hash'lemek
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error("Şifre hash'leme hatası:", err);
    return;
  }
  
  // Hash'lenmiş şifreyi konsola yazdırma
  console.log("Hash'lenmiş şifre:", hashedPassword);
});