---
name: project-understanding
description: 'Use when understanding the whole project structure, tracing frontend/backend flow, and keeping the user request central to every decision. Ideal for project audits, feature analysis, bug investigation, and requirement-based changes in this full-stack app.'
argument-hint: 'Ringkas permintaan saya, lalu jelaskan struktur proyek yang relevan dan dampaknya'
user-invocable: true
disable-model-invocation: false
---

# Pemahaman Proyek dan Prioritas User Request

## Saat dipakai
- Saat ingin memahami isi keseluruhan proyek sebelum mengubah kode.
- Saat harus memetakan arsitektur frontend, backend, basis data, dan alur data.
- Saat user meminta perubahan atau review, tetapi kita tidak ingin melupakan konteks proyek secara keseluruhan.
- Saat proyek berisi multi-stack seperti React + Laravel + SQL dataset.

## Tujuan
Skill ini memastikan AI tidak hanya fokus pada satu file atau satu bagian, tetapi juga memahami:
1. struktur keseluruhan proyek
2. alur kerja aplikasi
3. komunikasi frontend-backend
4. sumber data dan domain bisnis
5. prioritas serta batasan kebutuhan user

## Prosedur

### 1. Identifikasi permintaan user terlebih dahulu
Sebelum menilai kode, tuliskan:
- apa yang user minta secara spesifik
- output yang diharapkan
- batasan atau konteks yang penting
- apakah tugas bersifat fitur, perbaikan bug, review desain, atau dokumentasi

Jangan mulai dari kode sebelum memastikan fokus utama dari user.

### 2. Pahami struktur proyek secara holistik
Untuk proyek ini, cek komponen utama berikut:
- root project: package manager, script startup, dan hub kerja
- frontend/: aplikasi React/Vite untuk UI publik dan admin
- backend/: aplikasi Laravel untuk API dan logika server
- database/: SQL dump dan dataset pendukung
- scripts_archive/: artefak hasil ekstraksi/inspeksi halaman lama

Dalam proyek BonekaKu, gambaran umum yang relevan adalah:
- frontend menggunakan React + Vite + React Router
- backend menggunakan Laravel API routes untuk data publik dan admin
- front-end berisi halaman seperti Home, Katalog, Layanan, Tentang, Kontak, Artikel, dan Admin
- backend memiliki endpoint untuk kategori, produk, harga bean bag, testimoni, artikel, komentar, layanan, klien, setting, kontak, serta media

### 3. Baca entry point yang paling menentukan
Prioritaskan file yang paling menggambarkan alur aplikasi:
- root `package.json`
- `frontend/package.json`
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `backend/routes/api.php`
- `backend/routes/web.php`
- file `frontend/src/pages/*` yang relevan

Tujuannya adalah membangun peta awal: "aplikasi dimulai dari mana, halaman apa saja, dan API apa yang dipanggil."

### 4. Ikuti alur data dan fungsi bisnis
Setelah memahami struktur, trace:
- dari halaman ke komponen
- dari komponen ke API call
- dari API ke controller dan model
- dari data ke database / SQL dump

Pertanyaan yang harus dijawab:
- data apa yang dikirim ke UI?
- data apa yang disimpan atau diubah?
- apakah fitur ini publik, admin, atau keduanya?
- bagian mana yang terdampak bila user meminta perubahan tertentu?

### 5. Catat hubungan antar modul
Untuk proyek ini, modul penting biasanya meliputi:
- katalog produk dan kategori
- artikel/blog dan komentar
- layanan perusahaan
- kontak dan testimoni
- halaman admin untuk mengelola data
- konfigurasi setting dan media

Pastikan tidak menganggap satu modul berdiri sendiri tanpa mengecek efeknya pada halaman lain atau API yang sama.

### 6. Kembalikan ke permintaan user
Setelah memahami proyek, buat kesimpulan yang selalu menghubungkan ke kebutuhan user:
- bagian mana yang relevan
- apa yang harus diubah atau dicek
- apa yang tidak relevan
- apa risiko bila hanya melihat satu sisi proyek

Ini adalah inti skill: memahami proyek secara lengkap tanpa melupakan ask yang sedang dikerjakan.

## Decision points

### Jika user meminta perubahan UI
- cek halaman terkait di `frontend/src/pages` dan komponen layout
- cek apakah data berasal dari API atau data lokal
- pastikan perubahan tidak merusak routing atau state global

### Jika user meminta perubahan API/backend
- cek `backend/routes/api.php`
- cek controller terkait di `backend/app/Http/Controllers/Api`
- cek model dan database struktur jika diperlukan

### Jika user meminta review proyek
- buat peta arsitektur
- jelaskan modul utama
- tegaskan bagaimana frontend, backend, dan data saling berhubungan

### Jika user meminta debugging
- identifikasi titik masuk bug
- telusuri dari UI ke API dan sebaliknya
- verifikasi asumsi awal dengan fakta kode

## Checklist akhir sebelum menyimpulkan
- [ ] Permintaan user sudah dipahami dengan jelas
- [ ] Struktur proyek utama sudah dipetakan
- [ ] Frontend dan backend sudah dibandingkan secara relevan
- [ ] Data flow dan modul yang terdampak sudah ditelusuri
- [ ] Kesimpulan mengacu kembali ke kebutuhan user, bukan hanya kode random
- [ ] Tidak ada asumsi yang dibuat tanpa bukti dari file yang relevan

## Kesalahan yang harus dihindari
- Langsung membahas satu file tanpa melihat konteks keseluruhan proyek
- Mengubah kode namun tidak memetakan pengaruh ke modul terkait
- Menganggap user request hanya soal tampilan tanpa cek backend dan data
- Mengabaikan fakta bahwa proyek ini adalah aplikasi full-stack

## Output yang diharapkan
Skill ini menghasilkan pemahaman yang dapat dipakai untuk:
- menyusun laporan analisis proyek
- menentukan area kerja yang relevan
- memulai implementasi fitur tanpa kehilangan konteks
- mengecek apakah perubahan sudah sesuai dengan request user

## Ringkasan pendek
Pahami proyek secara keseluruhan, lalu jaga user request sebagai titik referensi utama. Jangan berhenti di satu folder, satu route, atau satu file; trace hubungan sistem, lalu hubungkan kembali ke apa yang benar-benar diminta.
