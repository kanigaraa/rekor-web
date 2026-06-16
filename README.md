# Rekor - Rekrut Organisasi

**Rekor** adalah aplikasi web untuk mengelola proses **Open Recruitment BEM UPNVJ** secara aman, terstruktur, dan mudah digunakan.

Project ini dibuat sebagai **Project UAS Mata Kuliah Keamanan Jaringan** dengan studi kasus sistem rekrutmen organisasi mahasiswa. Pada versi MVP ini, Rekor digunakan sebagai website pendaftaran open recruitment BEM UPNVJ untuk satu periode rekrutmen, dengan beberapa pilihan bidang/kementerian/biro yang dapat dipilih oleh pendaftar.

## Deskripsi Project

Rekor dirancang untuk membantu proses Open Recruitment BEM UPNVJ, mulai dari pendaftaran akun, pengisian formulir pendaftaran, pemilihan bidang/kementerian/biro, penilaian oleh reviewer, hingga pengelolaan status pendaftar oleh admin.

Aplikasi ini menyimpan data penting seperti akun pengguna, data pendaftar, pilihan bidang, motivasi, CV/portofolio, hasil review, status seleksi, dan session login. Oleh karena itu, Rekor menerapkan beberapa mekanisme keamanan seperti login aman, session management, password hashing, Role Based Access Control (RBAC), protected route, dan activity log.

## Konsep Aplikasi

Rekor bukan marketplace organisasi dan bukan platform untuk banyak organisasi berbeda.

Pada MVP ini, Rekor berfokus pada satu konteks utama:

> Website Open Recruitment BEM UPNVJ untuk satu periode rekrutmen.

Pendaftar dapat melihat informasi open recruitment, memilih bidang/kementerian/biro yang tersedia, mengisi formulir pendaftaran, lalu memantau status seleksinya melalui dashboard.

## Catatan Data Bidang

Daftar bidang/kementerian/biro pada project ini digunakan sebagai **data simulasi untuk kebutuhan UAS**. Nama bidang dapat disesuaikan kembali apabila tim memiliki struktur resmi terbaru dari BEM UPNVJ.

Contoh bidang yang digunakan pada MVP:

* Biro Kesekretariatan
* Biro Keuangan dan Pendanaan
* Biro Media dan Informasi
* Kementerian Advokasi dan Kesejahteraan Mahasiswa
* Kementerian Sosial Politik
* Kementerian Ekonomi Kreatif
* Departemen Kajian Strategis
* Departemen Kemitraan Strategis

## Tujuan Project

Tujuan dari project ini adalah:

* Mengidentifikasi aset informasi yang perlu dilindungi pada aplikasi rekrutmen organisasi.
* Menganalisis ancaman dan risiko keamanan pada aplikasi web.
* Mengevaluasi tata kelola keamanan menggunakan kontrol sederhana dari ISO 27001.
* Mengimplementasikan mekanisme keamanan pada layer 5, 6, dan 7 OSI.
* Melakukan pengujian keamanan terhadap fitur autentikasi, session, otorisasi, dan akses data.
* Membuat sistem open recruitment BEM UPNVJ yang rapi dan mudah digunakan.

## Tech Stack

### Frontend

* **Next.js** - Framework React untuk membangun aplikasi web.
* **TypeScript** - Untuk menjaga type safety dan struktur kode.
* **Tailwind CSS** - Untuk styling tampilan secara cepat, konsisten, dan responsif.

### Backend

* **Next.js Route Handler** - Untuk membuat API langsung di dalam project Next.js.
* **Prisma ORM** - Untuk mengelola database dengan lebih rapi.
* **PostgreSQL** - Database utama aplikasi.
* **bcryptjs** - Untuk melakukan hashing password.
* **Cookie Session** - Untuk manajemen session login pengguna.

### Security

* **Password Hashing** menggunakan bcrypt.
* **Session Management** menggunakan database session dan cookie `httpOnly`.
* **Role Based Access Control (RBAC)** untuk membatasi akses berdasarkan role.
* **Protected Route** untuk mencegah akses halaman tanpa autentikasi.
* **HTTPS/TLS** untuk mengamankan komunikasi data saat production.
* **Activity Log** untuk mencatat aktivitas penting pengguna.

### Development Tools

* **npm / Bun** - Package manager.
* **Git & GitHub** - Version control dan repository project.
* **Husky** - Git hooks.
* **ESLint** - Linting kode.
* **VS Code** - Code editor.

## Role Pengguna

| Role        | Deskripsi                                                                         |
| ----------- | --------------------------------------------------------------------------------- |
| Applicant   | Pendaftar Open Recruitment BEM UPNVJ.                                             |
| Reviewer    | Pengguna yang bertugas menilai data pendaftar.                                    |
| Admin       | Pengguna yang mengelola data pendaftar dan status seleksi.                        |
| Super Admin | Pengguna dengan hak akses tertinggi untuk mengelola user, role, dan activity log. |

## Fitur Utama

* Landing page Open Recruitment BEM UPNVJ.
* Register akun pendaftar.
* Login dan logout aman.
* Dashboard berdasarkan role pengguna.
* Form pendaftaran open recruitment.
* Pilihan bidang/kementerian/biro.
* Halaman status pendaftaran.
* Reviewer dapat melihat dan menilai pendaftar.
* Admin dapat mengelola data pendaftar dan status seleksi.
* Super Admin dapat mengelola user dan role.
* Session management.
* Password hashing.
* RBAC.
* Activity log.
* Protected route.

## Aset Informasi yang Dilindungi

Beberapa aset informasi yang perlu dilindungi dalam aplikasi ini adalah:

* Data akun pengguna.
* Password pengguna yang sudah di-hash.
* Nama lengkap pendaftar.
* Email pengguna.
* Nomor telepon.
* Jurusan atau asal fakultas.
* Angkatan.
* Pilihan bidang/kementerian/biro.
* Data form pendaftaran.
* Link CV atau portofolio.
* Nilai dan catatan reviewer.
* Status seleksi.
* Session login pengguna.
* Log aktivitas pengguna.

## Implementasi Keamanan Berdasarkan Layer OSI

| Layer                  | Implementasi                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| Layer 5 - Session      | Session management, cookie session, session expiration, logout.        |
| Layer 6 - Presentation | Password hashing, HTTPS/TLS, perlindungan data saat transmisi.         |
| Layer 7 - Application  | Login, logout, RBAC, protected route, validasi input, otorisasi akses. |

## Rancangan Halaman

| Route                         | Deskripsi                                    |
| ----------------------------- | -------------------------------------------- |
| `/`                           | Landing page Open Recruitment BEM UPNVJ.     |
| `/login`                      | Halaman login pengguna.                      |
| `/register`                   | Halaman register akun.                       |
| `/dashboard`                  | Dashboard pengguna berdasarkan role.         |
| `/apply`                      | Form pendaftaran Open Recruitment BEM UPNVJ. |
| `/my-application`             | Status pendaftaran milik pendaftar.          |
| `/reviewer/applications`      | Daftar pendaftar untuk reviewer.             |
| `/reviewer/applications/[id]` | Detail pendaftar dan form review.            |
| `/admin/applications`         | Dashboard admin untuk mengelola pendaftar.   |
| `/admin/users`                | Halaman pengelolaan user dan role.           |
| `/admin/activity-logs`        | Halaman activity log.                        |
| `/unauthorized`               | Halaman akses ditolak.                       |

## Database Schema

Database aplikasi dirancang dengan beberapa tabel utama:

| Tabel       | Fungsi                                                        |
| ----------- | ------------------------------------------------------------- |
| User        | Menyimpan data akun, email, password hash, dan role pengguna. |
| Session     | Menyimpan session login pengguna.                             |
| Application | Menyimpan data pendaftaran Open Recruitment BEM UPNVJ.        |
| Review      | Menyimpan penilaian reviewer terhadap pendaftar.              |
| ActivityLog | Menyimpan catatan aktivitas penting pengguna.                 |

Catatan:

* Field `division` pada database digunakan untuk menyimpan pilihan bidang/kementerian/biro.
* Pada UI, istilah yang ditampilkan adalah **Bidang/Kementerian/Biro**.
* MVP ini tidak menggunakan model `Organization` karena sistem hanya digunakan untuk satu konteks Open Recruitment BEM UPNVJ.

## Struktur Folder

```bash
rekor-web/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── applications/
│   │   │   ├── reviewer/
│   │   │   └── admin/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── apply/
│   │   ├── my-application/
│   │   ├── reviewer/
│   │   ├── admin/
│   │   └── unauthorized/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── application/
│   │   └── dashboard/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── session.ts
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   ├── validations.ts
│   │   └── activity-log.ts
│   └── generated/
├── .env
├── .env.example
├── package.json
├── README.md
└── PRD.md
```

## Instalasi Project

Clone repository:

```bash
git clone https://github.com/kanigaraa/rekor-web.git
cd rekor-web
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka aplikasi di browser:

```bash
http://localhost:3000
```

## Environment Variables

Buat file `.env` di root project, lalu isi konfigurasi berikut:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/rekor?schema=public"
```

Sesuaikan username, password, port, dan nama database dengan konfigurasi PostgreSQL lokal.

## Prisma Setup

Setelah database aktif, jalankan perintah berikut:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Untuk membuka Prisma Studio:

```bash
npx prisma studio
```

## Mekanisme Keamanan

### 1. Login dan Logout Aman

Login dilakukan dengan mencocokkan email dan password pengguna. Password tidak dibandingkan dalam bentuk asli, melainkan dibandingkan dengan hash password yang tersimpan di database.

Logout dilakukan dengan menghapus session pengguna dari database dan menghapus cookie session dari browser.

### 2. Password Hashing

Password pengguna tidak disimpan dalam bentuk plain text. Password akan di-hash menggunakan bcrypt sebelum disimpan ke database.

```text
password asli → bcrypt hash → passwordHash disimpan di database
```

### 3. Session Management

Session pengguna dibuat setelah login berhasil. Token session disimpan dalam cookie dengan konfigurasi keamanan seperti:

* `httpOnly`
* `secure`
* `sameSite`
* `maxAge`

Token session yang tersimpan di database digunakan untuk memvalidasi apakah pengguna masih memiliki akses yang sah.

### 4. Role Based Access Control

RBAC digunakan untuk membatasi akses berdasarkan role pengguna.

Contoh:

* Applicant hanya dapat mengakses form dan status pendaftaran miliknya sendiri.
* Reviewer hanya dapat mengakses halaman review pendaftar.
* Admin dapat mengelola data pendaftar dan status seleksi.
* Super Admin dapat mengelola user, role, dan activity log.

### 5. HTTPS/TLS

HTTPS/TLS digunakan untuk melindungi komunikasi antara client dan server agar data yang dikirim tidak mudah disadap atau dimodifikasi oleh pihak tidak berwenang.

## Pengujian Keamanan

| Pengujian                               | Tujuan                                              |
| --------------------------------------- | --------------------------------------------------- |
| Login dengan password salah             | Memastikan sistem menolak kredensial tidak valid.   |
| Akses halaman tanpa login               | Memastikan protected route berjalan.                |
| Akses halaman admin sebagai applicant   | Memastikan RBAC berjalan.                           |
| Logout lalu akses dashboard             | Memastikan session benar-benar dihapus.             |
| Cek password di database                | Memastikan password tersimpan dalam bentuk hash.    |
| Manipulasi role dari frontend           | Memastikan role tetap divalidasi di server.         |
| Cek cookie session                      | Memastikan cookie menggunakan konfigurasi keamanan. |
| Applicant mengakses data applicant lain | Memastikan otorisasi data berjalan.                 |

## Kaitan dengan ISO 27001 Controls

| Area Kontrol           | Implementasi                                   |
| ---------------------- | ---------------------------------------------- |
| Access Control         | RBAC, protected route, role validation.        |
| Authentication         | Login menggunakan email dan password.          |
| Cryptography           | Password hashing dengan bcrypt dan HTTPS/TLS.  |
| Logging and Monitoring | Activity log untuk mencatat aktivitas penting. |
| Secure Development     | Validasi input dan error handling.             |
| User Access Management | Pengelolaan role oleh super admin.             |

## Scope MVP

Pada MVP ini, Rekor tidak mendukung multi-organisasi. Artinya, aplikasi tidak menyediakan daftar banyak organisasi atau banyak event open recruitment.

Scope aplikasi hanya mencakup:

* Satu periode Open Recruitment BEM UPNVJ.
* Beberapa pilihan bidang/kementerian/biro.
* Satu form pendaftaran per applicant.
* Review dan pengelolaan status pendaftar.
* Pengelolaan role user.
* Activity log.

## Status Project

Project ini masih dalam tahap pengembangan untuk kebutuhan UAS Mata Kuliah Keamanan Jaringan.

Fokus utama project:

* Implementasi autentikasi.
* Implementasi session management.
* Implementasi password hashing.
* Implementasi RBAC.
* Implementasi form pendaftaran.
* Implementasi review pendaftar.
* Implementasi pengelolaan status seleksi.
* Implementasi pengujian keamanan sederhana.
* Penyusunan laporan audit keamanan aplikasi.

## Anggota Kelompok

| Nama                           | NIM        |
| ------------------------------ | ---------- |
| Rafid Abdan Syakur             | 2410512141 |
| Fathi Muhammad Luthfi Cardiana | 2410512142 |
| Khaliz Kanigara Fathi Gunawan  | 2410512151 |
| Muhammad Adla Fayyaz Fauzy     | 2410512154 |
| Muhammad Syauqi Rabbani        | 2410512166 |

Project UAS Mata Kuliah Keamanan Jaringan
Universitas Pembangunan Nasional "Veteran" Jakarta
