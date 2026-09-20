---
name: project-documentation
description: 'Use when documenting the project architecture, features, flows, setup, and behavior. Best for creating project reports, developer notes, run instructions, and explanations that reflect the real structure of this app.'
argument-hint: 'Dokumentasikan proyek ini untuk kebutuhan saya, dengan fokus pada struktur, alur, dan tujuan fitur.'
user-invocable: true
disable-model-invocation: false
---

# Dokumentasi Proyek

## Saat dipakai
- Saat menulis laporan proyek atau dokumentasi teknis.
- Saat perlu menjelaskan struktur aplikasi kepada orang lain.
- Saat membuat panduan setup, alur kerja, atau penjelasan fitur.
- Saat ingin memastikan dokumentasi mengikuti kondisi nyata proyek.

## Tujuan
Membuat dokumentasi yang akurat, ringkas, dan relevan dengan kondisi proyek saat ini tanpa mengabaikan kebutuhan user.

## Prosedur

### 1. Tentukan tujuan dokumentasi
Jenis dokumen yang umum:
- dokumentasi teknis
- laporan kerja proyek
- panduan instalasi dan eksekusi
- penjelasan fitur
- ringkasan arsitektur sistem

### 2. Pahami proyek terlebih dahulu
Sebelum menulis, kumpulkan gambaran utama:
- frontend React dan routing
- backend Laravel API
- database dan dataset pendukung
- modul utama, seperti katalog, artikel, kontak, layanan, admin

### 3. Fokus pada aspek yang relevan
Untuk proyek ini, bagian yang biasanya penting adalah:
- struktur folder utama
- entry point aplikasi
- route utama dan API
- modul bisnis utama
- cara menjalankan frontend dan backend
- batasan atau dependensi utama

### 4. Tulis berdasarkan fakta
Dokumentasi harus didasarkan pada file yang ada, bukan asumsi umum. Gunakan:
- `package.json` untuk skrip utama
- `frontend/src/App.jsx` untuk routing
- `backend/routes/api.php` untuk API utama
- modul halaman dan controller yang relevan

### 5. Sesuaikan dengan kebutuhan pembaca
- Pengguna non-teknis: fokus pada fitur dan tujuan aplikasi.
- Developer: fokus pada arsitektur, flow, dan API.
- User: fokus pada fungsi yang bisa dipakai.

### 6. Sediakan ringkasan yang utuh tetapi jelas
Dokumentasi yang baik biasanya mencakup:
- overview proyek
- struktur sistem
- alur kerja utama
- modul penting
- cara menjalankan
- catatan penggunaan atau batasan

## Decision points

### Jika dokumentasi untuk laporan
- fokus pada konteks proyek, fungsi, dan hasil sistem
- jelaskan bagian yang penting secara ringkas namun lengkap

### Jika dokumentasi untuk developer
- fokus pada struktur folder, route, API, dan alur data

### Jika dokumentasi untuk user
- fokus pada fungsi utama dan cara penggunaan

## Checklist akhir
- [ ] Tujuan dokumen sudah jelas
- [ ] Struktur proyek sudah dijelaskan dengan benar
- [ ] Fitur utama sudah tercakup
- [ ] Dokumentasi mengacu pada fakta proyek
- [ ] Format sesuai kebutuhan pembaca

## Kesalahan yang harus dihindari
- Menulis dokumentasi tanpa melihat struktur dunia nyata proyek
- Menggunakan penjelasan generik yang tidak sesuai aplikasi ini
- Melupakan frontend/backend integration
- Menyebutkan fitur yang tidak ada atau tidak sesuai implementation

## Output yang diharapkan
- dokumentasi proyek yang akurat
- penjelasan struktur sistem dengan konteks yang jelas
- ringkasan fungsional dan teknis yang mudah dipahami
