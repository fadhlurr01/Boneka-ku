---
name: feature-implementation
description: 'Use when implementing new features or extending an existing feature in this full-stack project. Follow the project structure, trace the relevant frontend/backend flow, and keep the user request as the main decision guide.'
argument-hint: 'Fitur apa yang ingin saya tambahkan, dan bagian proyek mana yang relevan?'
user-invocable: true
disable-model-invocation: false
---

# Implementasi Fitur

## Saat dipakai
- Saat menambahkan fitur baru ke frontend, backend, atau keduanya.
- Saat perlu menyesuaikan halaman, routing, API, atau data.
- Saat user meminta fitur dengan konteks proyek yang luas namun ingin tetap fokus pada kebutuhan utama.

## Tujuan
Membantu menerapkan fitur dengan cara yang konsisten dengan arsitektur aplikasi dan kebutuhan user.

## Prosedur

### 1. Pahami kebutuhan user
Sebelum coding, identifikasi:
- fitur apa yang diminta
- apakah fitur publik, admin, atau keduanya
- input dan output yang diharapkan
- data yang dibutuhkan

### 2. Pahami area yang terdampak
Cek modul terkait:
- frontend page atau component
- API route
- controller dan model
- data source atau database

Untuk proyek ini, area umum yang sering relevan:
- katalog produk
- artikel dan komentar
- layanan
- kontak
- setting dan media
- admin panel

### 3. Pilih pendekatan yang sesuai
- Jika perubahan hanya tampilan: fokus di frontend dan data yang ditampilkan.
- Jika perubahan memerlukan data baru: cek backend API dan storage.
- Jika fitur melibatkan CRUD: cek route, controller, model, dan SQL/dataset yang relevan.

### 4. Implementasikan secara terukur
- Mulai dari titik paling dekat dengan kebutuhan user.
- Jangan menambah struktur yang tidak dibutuhkan.
- Pastikan kode mengikuti pola yang sudah ada di proyek.

### 5. Hubungkan frontend-backend dengan benar
Jika fitur baru butuh data:
- buat atau sesuaikan route API
- cek apakah response format sesuai dengan frontend
- pastikan frontend membaca data dengan benar

### 6. Validasi hasil
- cek apakah fitur berjalan pada jalur yang relevan
- cek apakah data tercantum dengan benar
- cek apakah perubahan tidak merusak bagian lain

## Decision points

### Jika fitur hanya UI
- fokus pada halaman dan komponen tertentu
- periksa apakah data sudah tersedia atau perlu API

### Jika fitur memerlukan data baru
- cek backend route dan controller
- sesuaikan model atau data source jika diperlukan

### Jika fitur ada di admin
- pastikan proses CRUD atau form sesuai dengan tata kelola data aplikasi

### Jika fitur berdampak ke banyak page
- identifikasi shared component dan shared data source
- pastikan tidak terjadi inkonsistensi

## Checklist akhir
- [ ] Kebutuhan user sudah dijabarkan jelas
- [ ] Area yang terdampak sudah ditentukan
- [ ] Frontend dan backend sudah dipertimbangkan sesuai kebutuhan
- [ ] Implementasi minimal dan sesuai arsitektur proyek
- [ ] Hasil sudah diverifikasi secara relevan

## Kesalahan yang harus dihindari
- Membangun fitur tanpa peta modul yang relevan
- Menambahkan API baru tanpa melihat kebutuhan frontend
- Mengubah layout tanpa memeriksa data dan state
- Melupakan prioritas user saat memilih scope implementasi

## Output yang diharapkan
- fitur yang relevan dan konsisten
- arsitektur yang tetap terjaga
- perubahan yang berdampak sesuai kebutuhan user
