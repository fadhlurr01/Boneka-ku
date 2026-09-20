---
name: code-review
description: 'Use when reviewing code quality, architecture consistency, and whether changes still match the user request. Ideal for checking frontend logic, backend API correctness, and cross-module impact in this full-stack project.'
argument-hint: 'Tolong review bagian ini dan beri fokus pada apakah kode sesuai kebutuhan serta arsitektur proyek.'
user-invocable: true
disable-model-invocation: false
---

# Review Kode

## Saat dipakai
- Saat mengevaluasi perubahan kode atau pull request.
- Saat ingin memastikan kualitas implementasi tetap konsisten.
- Saat menilai apakah solusi benar-benar sesuai kebutuhan user.
- Saat review mencakup frontend, backend, atau hubungan antarmodul.

## Tujuan
Memastikan kode tidak hanya berjalan, tetapi juga sesuai dengan struktur proyek, best practice, dan kebutuhan user.

## Prosedur

### 1. Definisikan scope review
- Apa yang sedang ditinjau?
- Area mana yang terdampak?
- Apakah review fokus pada UI, API, data, atau keseluruhan alur?

### 2. Review berdasarkan arsitektur proyek
Periksa komponen utama seperti:
- `frontend/src/pages` untuk halaman
- `frontend/src/components` untuk reusable UI
- `frontend/src/context` untuk state global
- `backend/routes/api.php` untuk API surface
- `backend/app/Http/Controllers/Api` untuk business logic

### 3. Evaluasi kualitas logika
Tinjau aset berikut:
- apakah kode mudah dibaca
- apakah ada redundansi atau logic yang berlebihan
- apakah naming konsisten
- apakah state management dan data flow jelas
- apakah API dan frontend saling cocok

### 4. Cek dampak lintas modul
Pertanyaan penting:
- apakah perubahan memengaruhi halaman lain?
- apakah route atau API yang ditambah kompatibel dengan frontend?
- apakah data yang dipakai tetap sesuai dengan struktur real project?

### 5. Bandingkan dengan kebutuhan user
Review harus menjawab:
- apakah solusi sudah sesuai dengan permintaan
- apakah ada scope yang terlalu luas atau terlalu sempit
- apakah bagian yang berubah benar-benar relevan

### 6. Beri rekomendasi konkret
Hasil review harus berisi:
- apa yang sudah bagus
- apa yang perlu diperbaiki
- apakah ada risiko atau bug yang kemungkinan muncul
- prioritas perbaikan

## Decision points

### Jika issue ada di UI
- cek apakah komponen dan state sesuai pola yang sudah ada
- pastikan tidak ada coupling yang tidak perlu

### Jika issue ada di API
- cek controller, input validation, dan response contract
- pastikan route mengembalikan data yang konsisten

### Jika issue menyangkut integrasi
- review apakah frontend dan backend saling cocok
- pastikan format data dan endpoint konsisten

## Checklist review
- [ ] Scope review jelas
- [ ] Struktur proyek sudah dipahami
- [ ] Kode relevan dengan kebutuhan user
- [ ] Arsitektur dan alur data sudah diperiksa
- [ ] Risiko dan dampak lintas modul sudah dipertimbangkan
- [ ] Rekomendasi diberikan dengan klarifikasi prioritas

## Kesalahan yang harus dihindari
- Review hanya pada satu file tanpa melihat dampak sistem
- Mengevaluasi kode tanpa membaca konteks domain atau user request
- Menilai kode hanya dari tampilan, bukan dari integrasi dan data flow
- Memberi saran yang tidak realistis dengan arsitektur proyek

## Output yang diharapkan
- evaluasi kode yang terstruktur
- daftar temuan
- tingkat kritikalitas masalah
- saran perbaikan yang actionable
