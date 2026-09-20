---
name: project-debugging
description: 'Use when debugging bugs in the React frontend, Laravel API, or project flow. Focus on reproducing the issue, tracing the relevant route and data path, and validating the fix without losing the user request context.'
argument-hint: 'Bug apa yang terjadi, di bagian mana, dan apa yang seharusnya terjadi?'
user-invocable: true
disable-model-invocation: false
---

# Debugging Proyek

## Saat dipakai
- Saat ada error di frontend, backend, atau alur data.
- Saat fitur tidak berjalan sesuai harapan.
- Saat perlu menelusuri masalah dari UI sampai API dan database.
- Saat user meminta perbaikan tanpa menyebutkan lokasi pasti bug.

## Tujuan
Membantu menemukan akar masalah secara sistematis sambil tetap menjaga fokus pada kebutuhan user.

## Prosedur

### 1. Ulangi dan pahami gejala
- Catat perilaku yang salah.
- Tentukan output yang diharapkan.
- Identifikasi bagian yang terdampak: halaman, komponen, route, API, atau data.

### 2. Buat peta masalah
Gunakan konteks proyek untuk melihat lokasi yang relevan:
- frontend: `frontend/src/pages`, `frontend/src/components`, `frontend/src/context`
- backend: `backend/routes/api.php`, `backend/app/Http/Controllers/Api`
- data flow: API call, response, state, render UI

### 3. Ikuti jalur bug
Lacak dari awal sampai akhir:
1. user membuka halaman atau melakukan aksi
2. komponen memanggil API atau state
3. backend menerima request
4. controller/model memproses data
5. response dikembalikan ke frontend
6. render UI diperbarui atau gagal

### 4. Cari kemungkinan akar masalah
Berdasarkan jenis bug:
- UI bug: cek route, props, state, conditional rendering
- API bug: cek route, controller, method, validation, response format
- data bug: cek data fetch, parsing, missing field, SQL dataset
- integrasi bug: cek komunikasi frontend-backend dan naming mismatch

### 5. Verifikasi secara minimal
Setelah dugaan akar masalah diperoleh:
- lakukan perubahan paling sedikit yang diperlukan
- uji ulang gejala yang sama
- pastikan tidak memecahkan bagian lain secara tidak sengaja

### 6. Kembalikan ke kebutuhan user
Sebelum menutup, jawab:
- bug apa yang benar-benar terjadi
- apa akar penyebabnya
- apa yang sudah diperbaiki
- apakah perubahan sudah sesuai dengan request user

## Decision points

### Jika error muncul di UI
- cek halaman dan komponen yang sedang aktif
- cek apakah data yang dibutuhkan memang tersedia
- cek apakah API gagal atau render gagal

### Jika error muncul di API
- cek route, controller, dan validasi
- cek apakah request format sesuai
- cek apakah data dari database atau dataset lengkap

### Jika bug tidak jelas dari awal
- lakukan reproduksi bertahap
- fokus pada satu alur kerja
- jangan menebak di banyak file sekaligus

## Checklist akhir
- [ ] Bug sudah direproduksi atau dipahami dengan jelas
- [ ] Lokasi akar masalah sudah ditentukan
- [ ] Jalur data terkait sudah ditelusuri
- [ ] Perbaikan minimal dan sesuai kebutuhan user
- [ ] Hasil diverifikasi secara faktual

## Kesalahan yang harus dihindari
- Langsung menebak tanpa mengulang gejala
- Mengubah banyak file tanpa bukti akar masalah
- Menganggap bug hanya frontend atau hanya backend tanpa mengecek alur
- Melupakan konteks user saat menyelesaikan perbaikan

## Output yang diharapkan
- ringkasan root cause
- area yang salah
- perubahan yang dibuat
- bukti bahwa bug sudah diuji
