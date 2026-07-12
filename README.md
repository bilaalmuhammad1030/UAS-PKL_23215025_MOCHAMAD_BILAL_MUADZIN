# Sistem Administrasi dan Pengelolaan Soal Ujian Semester

Prototipe aplikasi administrasi berbasis web untuk membantu proses pengumpulan, verifikasi, pencarian, dan rekapitulasi soal ujian semester di **MA Mambaul Hikmah**.

## Akun Login

Gunakan akun berikut untuk masuk ke aplikasi:

| Keterangan | Data Login |
|---|---|
| **Nama Pengguna** | `admin` |
| **Kata Sandi** | `admin123` |

> Halaman login terdapat pada `index.html`. Setelah berhasil masuk, pengguna akan diarahkan ke halaman dashboard.

## Identitas Mahasiswa

| Identitas | Keterangan |
|---|---|
| **Nama** | Mochamad Bilal Muadzin |
| **NIM** | 23215025 |
| **Program Studi** | Teknik Informatika |
| **Tempat PKL** | MA Mambaul Hikmah |
| **Judul Sistem** | Sistem Administrasi dan Pengelolaan Soal Ujian Semester Berbasis Web di MA Mambaul Hikmah |

## Deskripsi Sistem

Sistem ini merupakan prototipe hasil observasi Praktik Kerja Lapangan (PKL). Aplikasi dirancang untuk membantu petugas administrasi madrasah dalam mengelola data guru, mata pelajaran, pengumpulan soal, status verifikasi, serta laporan pengumpulan soal ujian semester.

Aplikasi berjalan sepenuhnya pada browser sehingga tidak membutuhkan server, database, PHP, framework, maupun proses instalasi dependensi.

## Fitur Utama

### Autentikasi

- Login administrator menggunakan nama pengguna dan kata sandi.
- Status login disimpan melalui `sessionStorage`.
- Seluruh halaman administrasi dilindungi dari akses tanpa login.
- Tombol keluar untuk menghapus sesi pengguna.

### Dashboard

- Menampilkan jumlah guru dan mata pelajaran.
- Menampilkan jumlah seluruh pengumpulan soal.
- Menampilkan jumlah soal berstatus disetujui, perlu revisi, dan menunggu verifikasi.
- Menampilkan lima data pengumpulan terbaru.
- Menyediakan tombol reset data dengan konfirmasi.

### Data Guru

- Menambah, mengubah, menghapus, dan mencari data guru.
- Memuat nama guru, NIP atau kode guru internal, nomor telepon, dan mata pelajaran utama.
- Menggunakan kode guru internal yang konsisten, seperti `MA-MH-GR-001`.

### Mata Pelajaran

- Menambah, mengubah, menghapus, dan mencari mata pelajaran.
- Guru pengampu diambil secara otomatis dari data guru.
- Memuat kode mata pelajaran, nama mata pelajaran, kelas, dan guru pengampu.

### Pengumpulan Soal

- Mencatat data pengumpulan soal ujian semester.
- Pilihan guru dan mata pelajaran terhubung dengan data yang telah tersimpan.
- Mendukung status **Menunggu Verifikasi**, **Disetujui**, dan **Perlu Revisi**.
- Menyediakan pencarian serta filter berdasarkan status dan kelas.

### Laporan

- Menampilkan rekapitulasi lengkap pengumpulan soal.
- Menyediakan pencarian dan filter laporan.
- Memiliki tampilan khusus cetak yang menyembunyikan sidebar, formulir, dan tombol.

### Tampilan

- Menggunakan tema hijau khas aplikasi administrasi madrasah.
- Menggunakan logo resmi MA Mambaul Hikmah.
- Responsif untuk layar laptop, tablet, dan telepon genggam.
- Tabel dapat digulir secara horizontal pada layar kecil.
- Memiliki animasi interaksi pada tombol, menu, kartu, dan formulir.

## Teknologi

- HTML5
- CSS3
- JavaScript murni
- Local Storage
- Session Storage

Project ini **tidak menggunakan**:

- Framework
- npm
- Database
- PHP
- Library eksternal

## Struktur Folder

```text
UAS-PKL_23215025_MOCHAMAD_BILAL_MUADZIN/
|-- index.html
|-- dashboard.html
|-- guru.html
|-- mapel.html
|-- pengumpulan.html
|-- laporan.html
|-- css/
|   |-- login.css
|   |-- style.css
|   `-- animations.css
|-- js/
|   |-- login.js
|   |-- auth.js
|   |-- dashboard.js
|   |-- guru.js
|   |-- mapel.js
|   |-- pengumpulan.js
|   `-- laporan.js
|-- assets/
|   |-- logo-ma.png
|   `-- favicon.png
`-- README.md
```

## Cara Menjalankan Secara Lokal

1. Unduh atau clone repository ini.
2. Buka folder project.
3. Klik dua kali file `index.html`.
4. Aplikasi akan langsung terbuka melalui browser.
5. Masuk menggunakan akun berikut:

```text
Nama Pengguna : admin
Kata Sandi    : admin123
```

Tidak diperlukan instalasi tambahan. Project juga dapat dijalankan menggunakan ekstensi **Live Server** pada Visual Studio Code, tetapi hal tersebut bersifat opsional.

## Penyimpanan Data

Data aplikasi disimpan pada Local Storage browser menggunakan key berikut:

| Key | Kegunaan |
|---|---|
| `dataGuru` | Menyimpan data guru |
| `dataMapel` | Menyimpan data mata pelajaran |
| `dataPengumpulan` | Menyimpan data pengumpulan soal |
| `dataVersion` | Menandai versi data awal aplikasi |

Status login disimpan sementara pada Session Storage dan akan berakhir ketika sesi browser dihapus atau pengguna menekan tombol keluar.

Karena tidak menggunakan database, data hanya tersedia pada browser dan perangkat tempat aplikasi dijalankan.

## Data Awal

- Data guru dan mata pelajaran disusun berdasarkan dokumen Jadwal Simpatika Semester 2 MA Mambaul Hikmah.
- Aplikasi menyediakan 13 data guru dan 25 mata pelajaran sebagai data awal.
- Data pengumpulan awal digunakan untuk memperlihatkan fungsi dashboard, filter, status verifikasi, dan laporan.
- Data dapat ditambah, diubah, dihapus, atau dikembalikan melalui tombol reset pada dashboard.

## Cara Deploy ke Vercel

1. Buat repository baru di GitHub.
2. Unggah seluruh file dan folder project ke repository tersebut.
3. Masuk ke [Vercel](https://vercel.com/).
4. Pilih **Add New Project**.
5. Impor repository GitHub yang berisi project ini.
6. Pada pilihan framework, gunakan **Other**.
7. Biarkan bagian build command tetap kosong.
8. Klik **Deploy**.

Karena project berupa situs statis dan seluruh tautan menggunakan path relatif, aplikasi dapat langsung dijalankan di Vercel tanpa konfigurasi tambahan.

## Link Deploy

```text
https://nama-project.vercel.app
```

Ganti alamat tersebut dengan tautan Vercel setelah proses deploy selesai.

## Catatan

- Sistem ini merupakan prototipe untuk kebutuhan edukasi dan dokumentasi hasil observasi PKL.
- Sistem belum ditujukan sebagai aplikasi produksi.
- Data disimpan pada browser dan tidak tersinkronisasi antarperangkat.
- Untuk penggunaan nyata, sistem disarankan dikembangkan lebih lanjut dengan autentikasi server, database, pengelolaan hak akses, dan perlindungan data pribadi.

## Pengembang

**Copyright © 2026 By 23215025-Mochamad Bilal Muadzin**
