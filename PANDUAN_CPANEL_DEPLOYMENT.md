# Panduan Lengkap Deployment Proyek Bonekaku ke cPanel

Dokumen ini berisi panduan langkah demi langkah untuk melakukan deploy aplikasi **Bonekaku (Fullstack React 18 + Laravel 11 API)** ke hosting cPanel.

---

## 1. Arsitektur Folder yang Direkomendasikan di cPanel

Untuk keamanan terbaik dan performa optimal, berikut struktur direktori yang sangat disarankan pada cPanel:

```text
/home/username/
├── bonekaku_api/                  <-- Seluruh folder backend Laravel (Diletakkan di LUAR public_html agar aman)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/                    <-- Document Root untuk subdomain API
│   │   ├── uploads/
│   │   ├── .htaccess
│   │   └── index.php
│   ├── routes/
│   ├── storage/
│   ├── .env
│   └── artisan
│
└── public_html/                   <-- Frontend React (Hasil dari folder frontend/dist)
    ├── assets/
    │   ├── index-*.js
    │   └── index-*.css
    ├── favicon.svg
    ├── icons.svg
    ├── .htaccess                  <-- URL rewrite untuk React Router SPA
    └── index.html
```

---

## 2. Pilihan Skema Domain & Subdomain

### **Skema A: Subdomain API (Sangat Direkomendasikan)**
* **Frontend:** `https://bonekaku.co.id` (Document root: `/home/username/public_html`)
* **Backend API:** `https://api.bonekaku.co.id` (Document root: `/home/username/bonekaku_api/public`)

*Kelebihan:* Sangat rapi, tidak terjadi tabrakan routing antara React Router dan Laravel routing, serta kode inti Laravel terlindungi di luar folder web publik.

---

## 3. Langkah-Langkah Deployment

### Langkah 1: Persiapan & Build Frontend (React)

1. Di komputer lokal, buka file `frontend/.env` (atau buat file `.env.production` di dalam folder `frontend`):
   ```env
   VITE_API_URL=https://api.bonekaku.co.id/api
   ```
   *(Ganti `api.bonekaku.co.id` dengan domain/subdomain hosting Anda).*

2. Jalankan build frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   Proses ini akan menghasilkan folder `frontend/dist/` yang siap diunggah.

3. Pastikan di dalam `frontend/dist/` terdapat file `.htaccess` (sudah disiapkan otomatis dari `frontend/public/.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```
   *File `.htaccess` ini wajib ada agar ketika halaman seperti `/katalog`, `/layanan`, atau `/admin` di-refresh, tidak terjadi error 404 Not Found.*

4. Compress seluruh **isi** folder `frontend/dist/` menjadi `frontend.zip`.
5. Buka cPanel > **File Manager** > masuk ke folder `public_html/`.
6. Unggah `frontend.zip` lalu Extract langsung di dalam `public_html/`.

---

### Langkah 2: Setup Database di cPanel

1. Buka cPanel > **MySQL® Databases**.
2. Buat database baru, misalnya: `username_bonekaku`.
3. Buat user database baru, misalnya: `username_admin`, dan buat password yang kuat.
4. Pada bagian **Add User to Database**, hubungkan user dengan database tersebut dan centang **ALL PRIVILEGES**.
5. Catat nama database, user, dan password untuk langkah konfigurasi `.env`.

---

### Langkah 3: Setup Backend Laravel

1. Di komputer lokal, compress folder `backend` menjadi `backend.zip` (abaikan folder `node_modules` jika ada).
2. Di cPanel **File Manager**:
   - Buat folder baru di root `/home/username/` bernama `bonekaku_api`.
   - Unggah `backend.zip` ke dalam `/home/username/bonekaku_api/` dan Extract.
3. Buat / Edit file `.env` di dalam `/home/username/bonekaku_api/.env`:
   ```env
   APP_NAME="Bonekaku"
   APP_ENV=production
   APP_KEY=base64:YOUR_APP_KEY_HERE
   APP_DEBUG=false
   APP_URL=https://api.bonekaku.co.id

   LOG_CHANNEL=stack
   LOG_LEVEL=error

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=username_bonekaku
   DB_USERNAME=username_admin
   DB_PASSWORD=password_database_anda

   BROADCAST_CONNECTION=log
   FILESYSTEM_DISK=public
   CACHE_STORE=database
   SESSION_DRIVER=database
   QUEUE_CONNECTION=database
   ```

4. Di cPanel > **Subdomains**:
   - Buat subdomain `api.bonekaku.co.id`.
   - Atur **Document Root** subdomain ke: `bonekaku_api/public`.

5. Berikan izin akses tulis pada folder storage dan cache:
   - Klik kanan folder `storage` > **Change Permissions** > ubah ke `775` (atau `755` tergantung konfigurasi server).
   - Klik kanan folder `bootstrap/cache` > ubah ke `775`.

---

### Langkah 4: Migrasi & Seeding Data

#### Metode A: Menggunakan cPanel Terminal (Paling Cepat)
Jika paket cPanel Anda menyediakan fitur **Terminal**:
1. Buka Terminal di cPanel.
2. Masuk ke folder backend:
   ```bash
   cd ~/bonekaku_api
   php artisan key:generate
   php artisan migrate --force
   php artisan db:seed --force
   php artisan storage:link
   ```

#### Metode B: Menggunakan phpMyAdmin (Jika Tidak Ada SSH/Terminal)
1. Di komputer lokal Anda, jalankan migrasi & seed ke file SQL atau gunakan dataset JSON yang telah disediakan di root proyek (`dataset_complete.json`).
2. Masuk ke cPanel > **phpMyAdmin** > pilih database Anda > klik tab **Import** dan pilih file SQL backup untuk diimpor.

---

## 4. Pengujian & Verifikasi Fitur

Setelah seluruh langkah selesai, lakukan pengujian berikut:

1. **Akses Website Publik:**
   - Kunjungi `https://bonekaku.co.id`
   - Pastikan tampilan Home, Banner video Bean Bag, Marquee, dan Katalog berjalan lancar.
2. **Navigasi React SPA:**
   - Klik menu Katalog, Layanan, Tentang Kami, Kontak Kami, dan Artikel.
   - Lakukan refresh halaman di browser pada URL `https://bonekaku.co.id/katalog` (memastikan tidak muncul 404).
3. **Admin Panel:**
   - Akses URL `https://bonekaku.co.id/admin` atau klik link **Admin Panel** di bagian footer website.
   - Masukkan password default: `bonekaku123`.
   - Coba buat atau edit artikel baru di Editor Drawer.
   - Coba unggah gambar di menu **Media**.
4. **Fitur Interaktif:**
   - Tulis komentar pada salah satu artikel di `/artikel/:slug`.
   - Kirim pesan melalui formulir kontak di `/kontak`.
   - Klik tombol WhatsApp Floating Widget di pojok kanan bawah.

---

## 5. Tips & Pemecahan Masalah (Troubleshooting)

* **Halaman Sub-Route Error 404 Not Found saat Refresh:**
  Pastikan file `.htaccess` di dalam `public_html` sudah terunggah dan `mod_rewrite` aktif pada server Apache Anda.
* **Error CORS (Cross-Origin Resource Sharing):**
  Periksa file `backend/config/cors.php`. Konfigurasi proyek ini sudah diatur default untuk menerima request dari domain website Anda:
  ```php
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_origins' => ['*'],
  ```
* **Gambar Upload Tidak Muncul:**
  Pastikan symlink storage telah dibuat (`php artisan storage:link`) atau folder `public/uploads/media` memiliki izin tulis (permission `755`).
* **Mode Fallback Otomatis:**
  Frontend proyek ini telah dilengkapi sistem fallback offline (local storage & dataset bawaan). Jika backend sedang offline atau dalam perbaikan, seluruh katalog, artikel, dan simulasi pengiriman pesan tetap dapat berjalan tanpa membuat halaman crash.
