# Rekor - Rekrut Organisasi

**Rekor** adalah aplikasi web untuk mengelola proses rekrutmen anggota atau staff organisasi secara aman, terstruktur, dan mudah dikelola.

Project ini dibuat sebagai **Project UAS Mata Kuliah Keamanan Jaringan** dengan fokus pada analisis dan implementasi keamanan aplikasi web, khususnya pada mekanisme autentikasi, manajemen session, password hashing, Role Based Access Control (RBAC), serta penggunaan HTTPS/TLS.

## Deskripsi Project

Rekor dirancang untuk membantu organisasi dalam mengelola proses rekrutmen, mulai dari pendaftaran akun, pengisian formulir pendaftaran, penilaian oleh reviewer, hingga pengelolaan status pendaftar oleh admin.

Karena aplikasi ini menyimpan data penting seperti identitas pendaftar, akun pengguna, hasil review, status seleksi, dan informasi session, maka diperlukan mekanisme keamanan yang baik agar data tetap terlindungi.

## Tujuan Project

Tujuan dari project ini adalah:

* Mengidentifikasi aset informasi yang perlu dilindungi pada aplikasi rekrutmen organisasi.
* Menganalisis ancaman dan risiko keamanan pada aplikasi web.
* Mengevaluasi tata kelola keamanan menggunakan kontrol sederhana dari ISO 27001.
* Mengimplementasikan mekanisme keamanan pada layer 5, 6, dan 7.
* Melakukan pengujian keamanan terhadap fitur autentikasi, session, dan otorisasi pengguna.

## Tech Stack

Project ini menggunakan teknologi berikut:

### Frontend

* **Next.js** - Framework React untuk membangun aplikasi web.
* **TypeScript** - Supaya kode lebih aman dan mudah dikelola.
* **Tailwind CSS** - Untuk styling tampilan secara cepat dan responsif.

### Backend

* **Next.js API Routes / Route Handler** - Untuk membuat endpoint backend langsung di dalam project Next.js.
* **Prisma ORM** - Untuk mengelola database dengan lebih rapi.
* **PostgreSQL** - Database utama aplikasi.
* **bcryptjs** - Untuk melakukan hashing password.
* **Cookie Session** - Untuk manajemen session login pengguna.

### Security

* **Password Hashing** menggunakan bcrypt.
* **Session Management** menggunakan cookie `httpOnly`.
* **Role Based Access Control (RBAC)** untuk membatasi akses berdasarkan role.
* **HTTPS/TLS** untuk mengamankan komunikasi data.
* **Protected Route** untuk mencegah akses halaman tanpa autentikasi.
* **Activity Log** untuk mencatat aktivitas penting pengguna.

## Role Pengguna

Aplikasi Rekor memiliki beberapa role pengguna:

| Role        | Deskripsi                                                                            |
| ----------- | ------------------------------------------------------------------------------------ |
| Applicant   | Pendaftar organisasi yang dapat mengisi form pendaftaran dan melihat status seleksi. |
| Reviewer    | Pengguna yang bertugas menilai data pendaftar.                                       |
| Admin       | Pengguna yang mengelola data pendaftar dan status seleksi.                           |
| Super Admin | Pengguna dengan hak akses tertinggi untuk mengelola user, role, dan log aktivitas.   |

## Fitur Utama

Fitur utama yang dirancang dalam aplikasi Rekor:

* Register akun pengguna.
* Login dan logout aman.
* Dashboard berdasarkan role pengguna.
* Form pendaftaran organisasi.
* Melihat status pendaftaran.
* Reviewer dapat melihat dan menilai pendaftar.
* Admin dapat mengelola data pendaftar.
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
* Jurusan atau asal instansi.
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

Beberapa halaman utama dalam aplikasi Rekor:

| Route                         | Deskripsi                                  |
| ----------------------------- | ------------------------------------------ |
| `/`                           | Landing page aplikasi Rekor.               |
| `/login`                      | Halaman login pengguna.                    |
| `/register`                   | Halaman register akun.                     |
| `/dashboard`                  | Dashboard pengguna berdasarkan role.       |
| `/apply`                      | Form pendaftaran organisasi.               |
| `/my-application`             | Status pendaftaran milik pendaftar.        |
| `/reviewer/applications`      | Daftar pendaftar untuk reviewer.           |
| `/reviewer/applications/[id]` | Detail pendaftar dan form review.          |
| `/admin/applications`         | Dashboard admin untuk mengelola pendaftar. |
| `/admin/users`                | Halaman pengelolaan user dan role.         |
| `/unauthorized`               | Halaman akses ditolak.                     |

## Database Schema

Database aplikasi dirancang dengan beberapa tabel utama:

| Tabel       | Fungsi                                                        |
| ----------- | ------------------------------------------------------------- |
| User        | Menyimpan data akun, email, password hash, dan role pengguna. |
| Session     | Menyimpan session login pengguna.                             |
| Application | Menyimpan data pendaftaran organisasi.                        |
| Review      | Menyimpan penilaian reviewer terhadap pendaftar.              |
| ActivityLog | Menyimpan catatan aktivitas penting pengguna.                 |

## Struktur Folder

Struktur folder project secara umum:

```bash
rekor/
├── prisma/
│   └── schema.prisma
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
│   ├── lib/
│   └── generated/
├── .env
├── package.json
└── README.md
```

## Instalasi Project

Clone repository:

```bash
git clone https://github.com/username/rekor.git
cd rekor
```

Install dependencies:

```bash
bun install
```

Jalankan development server:

```bash
bun run dev
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

Contoh alur:

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

* Applicant hanya dapat mengakses halaman pendaftaran miliknya sendiri.
* Reviewer hanya dapat mengakses halaman review pendaftar.
* Admin dapat mengelola data pendaftar.
* Super Admin dapat mengelola user dan role.

### 5. HTTPS/TLS

HTTPS/TLS digunakan untuk melindungi komunikasi antara client dan server agar data yang dikirim tidak mudah disadap atau dimodifikasi oleh pihak tidak berwenang.

## Pengujian Keamanan

Beberapa pengujian keamanan yang dilakukan:

| Pengujian                             | Tujuan                                              |
| ------------------------------------- | --------------------------------------------------- |
| Login dengan password salah           | Memastikan sistem menolak kredensial tidak valid.   |
| Akses halaman tanpa login             | Memastikan protected route berjalan.                |
| Akses halaman admin sebagai applicant | Memastikan RBAC berjalan.                           |
| Logout lalu akses dashboard           | Memastikan session benar-benar dihapus.             |
| Cek password di database              | Memastikan password tersimpan dalam bentuk hash.    |
| Manipulasi role dari frontend         | Memastikan role tetap divalidasi di server.         |
| Cek cookie session                    | Memastikan cookie menggunakan konfigurasi keamanan. |

## Kaitan dengan ISO 27001 Controls

Project ini menggunakan beberapa kontrol keamanan sederhana yang relevan dengan ISO 27001, seperti:

| Area Kontrol                             | Implementasi                                            |
| ---------------------------------------- | ------------------------------------------------------- |
| Access Control                           | RBAC, protected route, role validation.                 |
| Authentication                           | Login menggunakan email dan password.                   |
| Cryptography                             | Password hashing dengan bcrypt dan HTTPS/TLS.           |
| Logging and Monitoring                   | Activity log untuk mencatat aktivitas penting.          |
| Information Security Incident Management | Identifikasi akses tidak sah dan percobaan login gagal. |

## Status Project

Project ini masih dalam tahap pengembangan untuk kebutuhan UAS Mata Kuliah Keamanan Jaringan.

Fokus utama project:

* Implementasi autentikasi.
* Implementasi session management.
* Implementasi password hashing.
* Implementasi RBAC.
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
