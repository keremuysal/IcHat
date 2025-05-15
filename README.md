# ✈️ İçHat (IcHat) - Uçtan Uca Şifreli Mesajlaşma

**İçHat**, uçtan uca şifreleme yöntemiyle çalışan, tamamen yerel çalışan bir mesajlaşma uygulamasıdır.  
İsmini, **“İç Hatlar Terminali”**nden alır. Tıpkı bir havalimanındaki iç hatlar gibi, iletişim **yalnızca içeride ve güvenlidir**.  
Gizlilik sizin elinizde: Mesajlar ve dosyalar yalnızca sizin masaüstünüze kaydedilir.

## 🚀 Özellikler

- 💬 **Mesajlaşma**: Kullanıcılar arasında güvenli metin mesajlaşması  
- 📎 **Dosya Gönderimi**: Dosya yükleme ve alma özelliği  
- 🗂️ **Kayıt Sistemi**: Tüm mesajlar ve dosyalar yerel olarak masaüstüne kaydedilir  
- 📅 **Günlük Tutan CSV**: Mesajlar, tarihli CSV dosyasına otomatik olarak loglanır  

## 🛠️ Kullanılan Teknolojiler

**Frontend:** React.js, HTML, CSS  
**Backend:** Node.js  
**Veritabanı:** Yerel dosya sistemi (CSV + klasör yapısı)  
**Sunucu:** Apache + Cloudflare (isteğe bağlı)

## ⚙️ Kurulum

**Gereksinimler:**

- Node.js (v14+)
- NPM veya Yarn
- Apache (opsiyonel)

**Kurulum Adımları:**

1. Depoyu klonlayın:  
   `git clone https://github.com/keremuysal/IcHat.git`

2. Dizin içine girin:  
   `cd IcHat`

3. Paketleri yükleyin:

   Frontend için:  
   ```cd frontend  
   npm install
	```
   Backend için:  
   ```cd ../backend  
   npm install
	```
4. Uygulamayı başlatın:

   Frontend:  
   `npm start`

   Backend:  
   `node server.js`

5. Tarayıcıdan şu adrese gidin:  
   `http://localhost:3000`

## 📁 Proje Yapısı

IcHat/  
├── frontend/ → React.js istemci uygulaması  
├── backend/ → Node.js sunucu uygulaması  
├── logs/  
│   ├── messages.csv → Mesaj günlükleri  
│   └── uploads/ → Yüklenen dosyalar


## ✉️ Mesaj ve Dosya Kaydı

- Her mesaj, kullanıcı adı ve zaman damgasıyla birlikte `messages.csv` dosyasına kaydedilir.  
- Yüklenen dosyalar, kullanıcı klasörleri içinde organize edilerek masaüstüne kaydedilir.


## 🧭 Yol Haritası

- 🔄 Gerçek Zamanlı Mesajlaşma (WebSocket ile)  
- 🛡️ Kimlik Doğrulama (JWT / OAuth ile)  
- 🧮 Veritabanı Desteği (ölçeklenebilirlik için)


## 🤝 Katkıda Bulunmak

Her katkı değerlidir!  
Bir **Issue** açabilir ya da doğrudan **Pull Request** gönderebilirsiniz.  

> Geliştirme aşamasındayız. Öneri ve geri bildirimlerinize açığız!

**Kerem Uysal tarafından geliştirildi.**  
[GitHub Profilim](https://github.com/keremuysal) | [Web Sitem](https://keremuysal.com)
