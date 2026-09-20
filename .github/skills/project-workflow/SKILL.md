---
name: project-workflow
description: 'Use when working on this full-stack project end-to-end: understand the project, debug issues, implement features, review code, and document results while keeping the user request as the main decision guide.'
argument-hint: 'Apa yang ingin saya kerjakan? Jelaskan konteks, tujuan, dan area proyek yang relevan.'
user-invocable: true
disable-model-invocation: false
---

# Workflow Proyek BonekaKu

## Saat dipakai
- Saat ingin memahami isi proyek secara keseluruhan sebelum pekerjaan dimulai.
- Saat ada bug yang perlu didebug.
- Saat menambahkan atau mengubah fitur.
- Saat mereview hasil kerja.
- Saat menulis dokumentasi atau laporan proyek.

## Tujuan utama
Menggabungkan seluruh aktivitas kerja ke dalam satu alur yang konsisten:
1. pahami proyek secara utuh
2. fokus pada permintaan user
3. trace masalah atau kebutuhan ke area yang tepat
4. implementasikan, review, dan dokumentasikan dengan benar

## Workflow utama

### 1. Mulai dari kebutuhan user
Sebelum menyentuh kode, jelaskan:
- apa yang diminta user
- hasil yang diharapkan
- bagian proyek yang relevan
- apakah tugasnya debugging, implementasi, review, atau dokumentasi

Jika tidak jelas, cari konteks dulu sebelum menyimpulkan.

### 2. Pahami konteks proyek secara holistik
Lihat struktur utama proyek:
- root project: skrip startup dan konfigurasi umum
- frontend/: aplikasi React + Vite + routing
- backend/: Laravel API dan logika server
- database/: SQL dataset dan struktur data
- scripts_archive/: artefak hasil ekstraksi atau inspeksi halaman lama

Fokus pada bagian yang relevan dengan user request. Jangan terburu-buru masuk ke file detail sebelum peta besar jelas.

### 3. Trace area yang terdampak
Tentukan area kerja:
- UI / page / component: cek `frontend/src`
- API: cek `backend/routes/api.php` dan `backend/app/Http/Controllers/Api`
- data: cek model, dataset, dan integrasi frontend-backend
- admin: cek fitur CRUD dan data management

Pastikan keputusan didasarkan pada alur nyata, bukan asumsi semata.

### 4. Pilih mode kerja berdasarkan kebutuhan

#### A. Jika ada bug
Ikuti alur debugging:
- reproduksi gejala
- telusuri jalur data dari UI ke API dan sebaliknya
- cari root cause
- uji solusi minimal
- validasi sesuai kebutuhan user

#### B. Jika ada fitur baru
Ikuti alur implementasi:
- pahami kebutuhan fitur
- pilih modul yang relevan
- sesuaikan frontend dan backend bila diperlukan
- pastikan output sinkron dengan kebutuhan user
- uji hasil pada area yang terkena dampak

#### C. Jika review kode
Ikuti alur review:
- cek scope, file, dan dampak lintas modul
- evaluasi logika, arsitektur, dan data flow
- bandingkan dengan kebutuhan user
- berikan rekomendasi konkret

#### D. Jika menulis dokumentasi
Ikuti alur dokumentasi:
- tetapkan tujuan dokumen
- jelaskan struktur proyek dan modul utama
- tulis alur kerja, feature, dan setup
- gunakan fakta dari file nyata
- sesuaikan bentuk dokumen untuk pembaca

### 5. Kembalikan ke user request
Setiap kesimpulan harus menjawab:
- apa yang sedang dikerjakan
- apa yang relevan
- apa yang sudah dipahami, dibenahi, atau direview
- apakah hasil sesuai dengan kebutuhan user

## Decision tree

### Jika tugas dimulai dari “apa isi proyek ini?”
- lakukan analisis holistik
- pahami frontend, backend, data, dan modul utama
- rangkum secara komprehensif, tapi tetap fokus ke kebutuhan user

### Jika tugas dimulai dari “bug ini terjadi”
- fokus pada reproduksi, root cause, dan validasi solusi
- trace dari UI ke API ke data, lalu balik lagi

### Jika tugas dimulai dari “fitur ini perlu ditambahkan”
- pahami kebutuhan, modul yang berdampak, dan alur data
- implementasikan dengan scope yang relevan

### Jika tugas dimulai dari “review kode”
- cek kualitas, integrasi, dan apakah solusi sesuai kebutuhan
- prioritaskan risk dan dampak lintas modul

### Jika tugas dimulai dari “buat dokumentasi”
- kumpulkan struktur proyek, modul utama, dan alur kerja
- susun laporan atau panduan yang akurat dan mudah dipahami

## Checklist akhir
- [ ] User request sudah dipahami dengan jelas
- [ ] Proyek dipetakan secara relevan
- [ ] Area yang terdampak telah diidentifikasi
- [ ] Solusi atau review didasarkan pada fakta proyek
- [ ] Kesimpulan selalu dikembalikan ke kebutuhan user
- [ ] Hasil akhir siap untuk debugging, implementasi, review, atau dokumentasi

## Prinsip inti
- Pahami proyek secara menyeluruh, tapi jangan melebar tanpa tujuan.
- Fokus pada permintaan user sebagai pusat keputusan.
- Gunakan fakta kode, bukan asumsi.
- Jalankan proses yang tepat sesuai jenis pekerjaan.

## Ringkasan pendek
Gunakan workflow ini untuk menghubungkan semua aktivitas: pahami proyek, pilih area yang relevan, kerja sesuai jenis tugas, lalu pastikan hasil selalu berhubungan dengan kebutuhan user.
