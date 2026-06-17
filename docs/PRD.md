# PRD.md - Rekor

## 1. Product Overview

**Rekor** adalah singkatan dari **Rekrut Organisasi**.

Rekor adalah aplikasi web untuk mengelola proses **Open Recruitment BEM UPNVJ** secara aman, terstruktur, dan mudah digunakan. Aplikasi ini dibuat sebagai **Project UAS Mata Kuliah Keamanan Jaringan**.

Pada MVP ini, Rekor digunakan untuk satu periode Open Recruitment BEM UPNVJ. Pendaftar dapat membuat akun, memilih bidang/kementerian/biro yang tersedia, mengisi form pendaftaran, dan memantau status seleksi. Reviewer dapat menilai pendaftar, sedangkan admin dapat mengelola status seleksi.

Fokus utama project ini adalah mengimplementasikan fitur rekrutmen dengan mekanisme keamanan aplikasi web seperti:

* Login dan logout aman.
* Session management.
* Password hashing.
* Role Based Access Control.
* Protected route.
* HTTPS/TLS.
* Activity log.
* Pengujian keamanan sederhana.

## 2. Project Context

Project ini dibuat untuk memenuhi tugas:

**Analisis dan Implementasi Keamanan Aplikasi XYZ**

Aplikasi XYZ dalam project ini adalah:

> **Rekor - Website Open Recruitment BEM UPNVJ**

Mahasiswa melakukan audit keamanan sederhana terhadap aplikasi Rekor, kemudian merancang dan mengimplementasikan mekanisme keamanan pada layer 5, 6, dan 7 OSI.

Rekor bukan marketplace organisasi dan bukan portal banyak organisasi. Rekor adalah sistem open recruitment untuk satu organisasi dan satu periode rekrutmen, yaitu BEM UPNVJ.

Pendaftar tidak memilih organisasi. Pendaftar memilih bidang/kementerian/biro yang tersedia dalam proses open recruitment.

## 3. Goals

Tujuan utama aplikasi Rekor:

1. Menyediakan website Open Recruitment BEM UPNVJ.
2. Memudahkan pendaftar untuk register, login, mengisi form, memilih bidang/kementerian/biro, dan melihat status seleksi.
3. Memudahkan reviewer untuk melihat dan menilai pendaftar.
4. Memudahkan admin untuk mengelola data pendaftar dan status seleksi.
5. Memudahkan super admin untuk mengelola user, role, dan activity log.
6. Mengimplementasikan keamanan aplikasi web sesuai kebutuhan tugas Keamanan Jaringan.

## 4. Non-Goals

Hal-hal yang tidak menjadi prioritas pada versi awal:

1. Multi-organisasi.
2. Marketplace open recruitment.
3. List banyak organisasi.
4. Banyak periode recruitment sekaligus.
5. Sistem email notification.
6. Upload file asli ke cloud storage.
7. Integrasi OAuth seperti Google Login.
8. Payment atau sistem pembayaran.
9. Chat realtime.
10. Interview scheduling kompleks.
11. Dashboard analytics lanjutan.

Untuk MVP, CV dan portofolio cukup menggunakan input URL.

## 5. Main Concept

Flow utama aplikasi:

```txt
User membuka website Rekor
↓
User melihat informasi Open Recruitment BEM UPNVJ
↓
User register atau login
↓
User mengisi form pendaftaran
↓
User memilih bidang/kementerian/biro
↓
User submit pendaftaran
↓
Reviewer memberikan nilai dan catatan
↓
Admin menentukan status diterima atau ditolak
```

## 6. Terminology

Gunakan istilah berikut secara konsisten:

| Istilah Teknis | Istilah UI              |
| -------------- | ----------------------- |
| Application    | Pendaftaran             |
| Applicant      | Pendaftar               |
| Division       | Bidang/Kementerian/Biro |
| Review         | Penilaian               |
| Status         | Status Seleksi          |

Catatan:

* Di database, field boleh tetap menggunakan nama `division`.
* Di UI, tampilkan sebagai `Bidang/Kementerian/Biro`.
* Jangan membuat model `Organization` untuk MVP.
* Jangan membuat route list organisasi.
* Jangan membuat route detail organisasi.

## 7. Target Users

### 7.1 Applicant

Pendaftar Open Recruitment BEM UPNVJ.

Kebutuhan:

* Membuat akun.
* Login.
* Mengisi form pendaftaran.
* Memilih bidang/kementerian/biro.
* Menyimpan draft pendaftaran.
* Submit pendaftaran.
* Melihat status seleksi.

### 7.2 Reviewer

Penilai pendaftar.

Kebutuhan:

* Login.
* Melihat daftar pendaftar yang perlu direview.
* Melihat detail data pendaftar.
* Memberikan nilai dan catatan.
* Submit hasil review.

### 7.3 Admin

Pengelola rekrutmen.

Kebutuhan:

* Login.
* Melihat semua data pendaftar.
* Filter pendaftar berdasarkan status atau bidang/kementerian/biro.
* Mengubah status pendaftar.
* Melihat hasil review dari reviewer.

### 7.4 Super Admin

Pengelola tertinggi sistem.

Kebutuhan:

* Login.
* Melihat semua user.
* Mengubah role user.
* Melihat activity log.
* Mengelola akses sistem.

## 8. User Roles

| Role          | Deskripsi                                    |
| ------------- | -------------------------------------------- |
| `APPLICANT`   | Pendaftar Open Recruitment BEM UPNVJ.        |
| `REVIEWER`    | Penilai pendaftar.                           |
| `ADMIN`       | Pengelola data pendaftar dan status seleksi. |
| `SUPER_ADMIN` | Pengelola user, role, dan activity log.      |

## 9. Role Based Access Control

### 9.1 Public Access

| Route           | Deskripsi                               |
| --------------- | --------------------------------------- |
| `/`             | Landing page Open Recruitment BEM UPNVJ |
| `/login`        | Login                                   |
| `/register`     | Register                                |
| `/unauthorized` | Halaman akses ditolak                   |

### 9.2 Applicant Access

Role: `APPLICANT`

| Route             | Akses       |
| ----------------- | ----------- |
| `/dashboard`      | Bisa akses  |
| `/apply`          | Bisa akses  |
| `/my-application` | Bisa akses  |
| `/reviewer/*`     | Tidak boleh |
| `/admin/*`        | Tidak boleh |

### 9.3 Reviewer Access

Role: `REVIEWER`

| Route                         | Akses       |
| ----------------------------- | ----------- |
| `/dashboard`                  | Bisa akses  |
| `/reviewer/applications`      | Bisa akses  |
| `/reviewer/applications/[id]` | Bisa akses  |
| `/admin/*`                    | Tidak boleh |
| `/apply`                      | Tidak boleh |

### 9.4 Admin Access

Role: `ADMIN`

| Route                      | Akses                      |
| -------------------------- | -------------------------- |
| `/dashboard`               | Bisa akses                 |
| `/admin/applications`      | Bisa akses                 |
| `/admin/applications/[id]` | Bisa akses                 |
| `/reviewer/applications`   | Bisa akses jika dibutuhkan |
| `/admin/users`             | Tidak boleh                |
| `/apply`                   | Tidak boleh                |

### 9.5 Super Admin Access

Role: `SUPER_ADMIN`

| Route                 | Akses      |
| --------------------- | ---------- |
| Semua route protected | Bisa akses |

## 10. Data Bidang/Kementerian/Biro

Data bidang pada aplikasi ini digunakan sebagai **data simulasi untuk kebutuhan UAS**. Nama bidang dapat disesuaikan kembali jika tim memiliki struktur resmi terbaru dari BEM UPNVJ.

Gunakan data sementara berikut:

```txt
- Biro Kesekretariatan
- Biro Keuangan dan Pendanaan
- Biro Media dan Informasi
- Kementerian Advokasi dan Kesejahteraan Mahasiswa
- Kementerian Sosial Politik
- Kementerian Ekonomi Kreatif
- Departemen Kajian Strategis
- Departemen Kemitraan Strategis
```

Penting:

* Jangan klaim daftar ini sebagai struktur resmi terbaru jika belum diverifikasi.
* Jangan membuat fitur multi-organisasi.
* Jangan membuat model `Organization`.
* Tetap gunakan field `division` untuk menyimpan pilihan bidang.

## 11. Main Features

### 11.1 Landing Page

Route:

```txt
/
```

Tujuan:

Landing page harus terasa seperti website Open Recruitment BEM UPNVJ, bukan website penyedia platform oprec umum.

Isi halaman:

* Navbar.
* Hero Open Recruitment BEM UPNVJ.
* CTA ke register dan login.
* Informasi singkat tentang Rekor.
* Section bidang/kementerian/biro yang dibuka.
* Alur pendaftaran.
* CTA akhir untuk daftar.
* Footer.

Copywriting utama:

```txt
Open Recruitment BEM UPNVJ

Saatnya jadi bagian dari BEM UPN "Veteran" Jakarta. Pilih bidang yang sesuai dengan minatmu, lengkapi formulir pendaftaran, dan pantau status seleksimu melalui Rekor.
```

Landing page tidak boleh terlalu banyak menjelaskan keamanan.

Jangan menampilkan:

* ISO 27001 di landing page.
* OSI layer di landing page.
* Password hashing di landing page.
* Session management di landing page.
* Copywriting seperti SaaS komersial.
* Kalimat seperti "bergabung dengan banyak organisasi lainnya".
* Marketplace organisasi.
* List banyak organisasi.

Acceptance criteria:

* User dapat melihat informasi Open Recruitment BEM UPNVJ.
* User dapat melihat pilihan bidang/kementerian/biro.
* User dapat menuju halaman login.
* User dapat menuju halaman register.
* Landing page tidak terlalu banyak teks.
* Landing page tidak terlihat seperti platform komersial untuk banyak organisasi.

### 11.2 Register

Route:

```txt
/register
```

Field:

* Name
* Email
* Password
* Confirm Password

Rules:

* Email harus unik.
* Password minimal 8 karakter.
* Password dan confirm password harus sama.
* User baru otomatis mendapat role `APPLICANT`.
* Password harus di-hash menggunakan bcrypt sebelum disimpan ke database.
* Password asli tidak boleh disimpan.

Acceptance criteria:

* User berhasil register dengan data valid.
* User tidak bisa register dengan email yang sudah digunakan.
* Password tersimpan sebagai hash.
* Role default adalah `APPLICANT`.

### 11.3 Login

Route:

```txt
/login
```

Field:

* Email
* Password

Rules:

* Login menggunakan email dan password.
* Password diverifikasi menggunakan `bcrypt.compare`.
* Jika login berhasil, server membuat session.
* Session token disimpan di cookie `httpOnly`.
* Data session disimpan di database.
* Jangan menyimpan token di localStorage.

Acceptance criteria:

* User dapat login dengan credential valid.
* User tidak dapat login dengan credential salah.
* Session cookie dibuat setelah login berhasil.
* User diarahkan ke dashboard.

### 11.4 Logout

Endpoint:

```txt
POST /api/auth/logout
```

Rules:

* Hapus session dari database.
* Hapus cookie session dari browser.

Acceptance criteria:

* User logout berhasil.
* Session tidak bisa digunakan lagi setelah logout.
* User tidak bisa mengakses halaman protected setelah logout.

### 11.5 Dashboard

Route:

```txt
/dashboard
```

Isi dashboard menyesuaikan role.

Applicant:

* Greeting user.
* Status pendaftaran.
* CTA isi form pendaftaran.
* CTA lihat status.

Reviewer:

* Total pendaftar yang perlu direview.
* CTA ke halaman review.

Admin:

* Total applicant.
* Total submitted.
* Total accepted.
* Total rejected.
* CTA ke admin applications.

Super Admin:

* Total user.
* Total role.
* Total activity log.
* CTA ke user management.

Acceptance criteria:

* Dashboard hanya dapat diakses user login.
* Konten dashboard sesuai role user.

### 11.6 Application Form

Route:

```txt
/apply
```

Role allowed:

```txt
APPLICANT
```

Field:

* Full name
* Phone
* Major
* Batch
* Division atau Bidang/Kementerian/Biro
* Motivation
* CV URL
* Portfolio URL

Application status:

| Status         | Deskripsi          |
| -------------- | ------------------ |
| `DRAFT`        | Form belum dikirim |
| `SUBMITTED`    | Form sudah dikirim |
| `UNDER_REVIEW` | Sedang dinilai     |
| `ACCEPTED`     | Diterima           |
| `REJECTED`     | Ditolak            |

Rules:

* Applicant hanya dapat membuat dan mengedit application miliknya sendiri.
* Applicant tidak boleh mengubah status menjadi `ACCEPTED`, `REJECTED`, atau `UNDER_REVIEW`.
* Applicant dapat menyimpan sebagai draft.
* Applicant dapat submit application.
* Setelah status `SUBMITTED`, applicant tidak boleh mengedit data kecuali sistem mengizinkan pada versi berikutnya.

Acceptance criteria:

* Applicant bisa menyimpan draft.
* Applicant bisa submit application.
* Applicant dapat memilih bidang/kementerian/biro.
* Applicant tidak bisa mengakses application milik user lain.
* Applicant tidak bisa mengubah status secara ilegal dari frontend atau API.

### 11.7 My Application

Route:

```txt
/my-application
```

Role allowed:

```txt
APPLICANT
```

Isi halaman:

* Data application milik user.
* Status application.
* Catatan hasil review jika ada.
* Tanggal submit.
* Bidang/kementerian/biro yang dipilih.

Acceptance criteria:

* Applicant hanya melihat application miliknya sendiri.
* Jika belum punya application, tampilkan empty state.
* Status tampil jelas.

### 11.8 Reviewer Applications

Route:

```txt
/reviewer/applications
```

Role allowed:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

Isi halaman:

* List application yang sudah `SUBMITTED` atau `UNDER_REVIEW`.
* Search applicant.
* Filter bidang/kementerian/biro.
* Filter status.
* Tombol detail/review.

Acceptance criteria:

* Reviewer dapat melihat daftar pendaftar.
* Reviewer tidak dapat mengubah status final.
* Reviewer dapat masuk ke detail application.

### 11.9 Reviewer Application Detail

Route:

```txt
/reviewer/applications/[id]
```

Role allowed:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

Isi halaman:

* Data applicant.
* Motivation.
* CV URL.
* Portfolio URL.
* Bidang/kementerian/biro yang dipilih.
* Input score.
* Input note.
* Submit review.

Rules:

* Score berupa angka.
* Score minimal 0 dan maksimal 100.
* Note bersifat opsional.
* Setelah reviewer submit review, status application dapat berubah menjadi `UNDER_REVIEW`.

Acceptance criteria:

* Reviewer bisa submit review.
* Review tersimpan ke database.
* Activity log tercatat.
* Applicant dapat melihat catatan jika dibutuhkan.

### 11.10 Admin Applications

Route:

```txt
/admin/applications
```

Role allowed:

```txt
ADMIN
SUPER_ADMIN
```

Isi halaman:

* Total pendaftar.
* Total submitted.
* Total under review.
* Total accepted.
* Total rejected.
* Tabel semua application.
* Filter status.
* Filter bidang/kementerian/biro.
* Action update status.

Rules:

* Admin dapat mengubah status application menjadi:

  * `UNDER_REVIEW`
  * `ACCEPTED`
  * `REJECTED`
* Admin tidak boleh mengubah password user dari halaman ini.
* Semua update status harus dicatat ke activity log.

Acceptance criteria:

* Admin dapat melihat semua application.
* Admin dapat update status.
* Applicant dapat melihat status terbaru.
* Perubahan status tercatat di activity log.

### 11.11 User Management

Route:

```txt
/admin/users
```

Role allowed:

```txt
SUPER_ADMIN
```

Isi halaman:

* List user.
* Nama.
* Email.
* Role.
* Created date.
* Action change role.

Rules:

* Hanya `SUPER_ADMIN` yang boleh mengubah role.
* Role yang bisa dipilih:

  * `APPLICANT`
  * `REVIEWER`
  * `ADMIN`
  * `SUPER_ADMIN`
* Perubahan role harus dicatat ke activity log.

Acceptance criteria:

* Super admin dapat melihat semua user.
* Super admin dapat mengubah role user.
* User non-super-admin tidak dapat mengakses halaman ini.
* API tetap memvalidasi role di server.

### 11.12 Activity Log

Route:

```txt
/admin/activity-logs
```

Role allowed:

```txt
SUPER_ADMIN
```

Isi halaman:

* Tanggal aktivitas.
* User.
* Action.
* Description.
* IP address.
* User agent.

Action yang dicatat:

* `REGISTER`
* `LOGIN`
* `LOGOUT`
* `CREATE_APPLICATION`
* `UPDATE_APPLICATION`
* `SUBMIT_APPLICATION`
* `REVIEW_APPLICATION`
* `UPDATE_STATUS`
* `CHANGE_ROLE`

Acceptance criteria:

* Activity log tercatat untuk aktivitas penting.
* Super admin dapat melihat log.
* User biasa tidak dapat melihat log.

## 12. Security Requirements

### 12.1 Password Hashing

Rules:

* Password harus di-hash menggunakan bcrypt.
* Salt round minimal 10, disarankan 12.
* Password asli tidak boleh disimpan di database.
* API tidak boleh mengembalikan `passwordHash`.

Implementation:

```txt
bcrypt.hash(password, 12)
bcrypt.compare(password, user.passwordHash)
```

### 12.2 Session Management

Rules:

* Gunakan database session.
* Cookie hanya menyimpan session token.
* Token session harus random.
* Token session yang disimpan di database harus berupa hash.
* Cookie harus menggunakan:

  * `httpOnly: true`
  * `secure: true` di production
  * `sameSite: "lax"`
  * `path: "/"`
  * `maxAge`

Dilarang:

* Menyimpan session token di localStorage.
* Menyimpan password di cookie.
* Menyimpan role sebagai sumber validasi utama di client.

### 12.3 RBAC

Rules:

* Validasi role wajib dilakukan di server.
* Frontend hanya boleh digunakan untuk menyembunyikan UI, bukan sebagai sumber keamanan utama.
* API admin harus memanggil helper seperti `requireRole`.
* Applicant hanya boleh mengakses data miliknya sendiri.

### 12.4 Protected Route

Rules:

* Halaman protected harus redirect ke `/login` jika user belum login.
* Jika user login tetapi tidak punya role yang sesuai, redirect ke `/unauthorized`.

### 12.5 HTTPS/TLS

Rules:

* Saat production, aplikasi harus berjalan di HTTPS.
* Cookie production harus menggunakan `secure: true`.
* Deployment di Vercel atau platform lain yang menyediakan HTTPS otomatis diperbolehkan.

### 12.6 Input Validation

Rules:

* Semua request body harus divalidasi.
* Email harus format email.
* Password minimal 8 karakter.
* Score harus angka 0 sampai 100.
* URL CV/portfolio harus valid URL jika diisi.
* Jangan percaya data dari client.

Recommended:

* Gunakan Zod untuk validasi schema request.

### 12.7 Error Handling

Rules:

* Jangan tampilkan detail error database ke client.
* Login gagal harus menggunakan message umum:

```txt
Invalid email or password
```

* Jangan beri tahu apakah email terdaftar atau password salah pada proses login.

## 13. OSI Layer Mapping

| Layer                  | Implementasi                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| Layer 5 - Session      | Cookie session, session expiration, logout, database session         |
| Layer 6 - Presentation | Password hashing, HTTPS/TLS, perlindungan data saat transmisi        |
| Layer 7 - Application  | Login, logout, RBAC, protected route, input validation, activity log |

## 14. ISO 27001 Control Mapping

| Area Kontrol           | Implementasi di Rekor                                     |
| ---------------------- | --------------------------------------------------------- |
| Access Control         | RBAC, protected route, role validation                    |
| Authentication         | Login email dan password                                  |
| Cryptography           | bcrypt password hashing, HTTPS/TLS                        |
| Logging and Monitoring | Activity log                                              |
| Secure Development     | Validasi input, error handling, server-side authorization |
| User Access Management | Role management oleh super admin                          |

## 15. Tech Stack

### 15.1 Core Stack

* **Next.js** sebagai framework utama.
* **TypeScript** untuk type safety.
* **Tailwind CSS** untuk styling.
* **Prisma ORM** untuk database access.
* **PostgreSQL** sebagai database.
* **bcryptjs** untuk password hashing.
* **Cookie session** untuk session management.

### 15.2 Development Tools

* **npm** atau **Bun** untuk package manager.
* **Git** untuk version control.
* **GitHub** untuk repository.
* **Husky** untuk Git hooks.
* **ESLint** untuk linting.
* **VS Code** sebagai code editor.

## 16. Database Schema

Gunakan schema utama berikut:

### User

Menyimpan data akun user.

Fields:

* `id`
* `name`
* `email`
* `passwordHash`
* `role`
* `createdAt`
* `updatedAt`

### Session

Menyimpan data session login.

Fields:

* `id`
* `tokenHash`
* `userId`
* `expiresAt`
* `userAgent`
* `ipAddress`
* `createdAt`
* `updatedAt`

### Application

Menyimpan data pendaftaran.

Fields:

* `id`
* `applicantId`
* `fullName`
* `phone`
* `major`
* `batch`
* `division`
* `motivation`
* `cvUrl`
* `portfolioUrl`
* `status`
* `createdAt`
* `updatedAt`

Catatan:

* Field `division` digunakan untuk menyimpan pilihan bidang/kementerian/biro.
* UI harus menampilkan label `Bidang/Kementerian/Biro`.

### Review

Menyimpan hasil review.

Fields:

* `id`
* `applicationId`
* `reviewerId`
* `score`
* `note`
* `createdAt`
* `updatedAt`

### ActivityLog

Menyimpan log aktivitas penting.

Fields:

* `id`
* `userId`
* `action`
* `description`
* `ipAddress`
* `userAgent`
* `createdAt`

## 17. Suggested Folder Structure

```txt
rekor-web/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── me/
│   │   │   │   └── register/
│   │   │   ├── applications/
│   │   │   ├── reviewer/
│   │   │   └── admin/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── apply/
│   │   ├── my-application/
│   │   ├── reviewer/
│   │   │   └── applications/
│   │   ├── admin/
│   │   │   ├── applications/
│   │   │   ├── users/
│   │   │   └── activity-logs/
│   │   ├── unauthorized/
│   │   ├── layout.tsx
│   │   └── page.tsx
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
│   ├── generated/
│   │   └── prisma/
│   └── middleware.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── PRD.md
```

## 18. API Requirements

### 18.1 Auth API

#### Register

```txt
POST /api/auth/register
```

Request body:

```json
{
  "name": "Khaliz Kanigara",
  "email": "khaliz@example.com",
  "password": "password123"
}
```

#### Login

```txt
POST /api/auth/login
```

Request body:

```json
{
  "email": "khaliz@example.com",
  "password": "password123"
}
```

#### Me

```txt
GET /api/auth/me
```

#### Logout

```txt
POST /api/auth/logout
```

### 18.2 Application API

#### Create or Update Draft

```txt
POST /api/applications
```

Role:

```txt
APPLICANT
```

Request body:

```json
{
  "fullName": "Khaliz Kanigara",
  "phone": "08123456789",
  "major": "Sistem Informasi",
  "batch": "2024",
  "division": "Biro Media dan Informasi",
  "motivation": "Saya ingin bergabung untuk mengembangkan kemampuan dan berkontribusi dalam BEM UPNVJ.",
  "cvUrl": "https://example.com/cv.pdf",
  "portfolioUrl": "https://example.com/portfolio"
}
```

#### Submit Application

```txt
PATCH /api/applications/submit
```

Role:

```txt
APPLICANT
```

Rules:

* Mengubah status dari `DRAFT` menjadi `SUBMITTED`.
* Hanya untuk application milik user login.

#### Get My Application

```txt
GET /api/applications/me
```

Role:

```txt
APPLICANT
```

Rules:

* Hanya return application milik user login.

### 18.3 Reviewer API

#### Get Reviewable Applications

```txt
GET /api/reviewer/applications
```

Role:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

#### Get Reviewable Application Detail

```txt
GET /api/reviewer/applications/[id]
```

Role:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

#### Review Application

```txt
POST /api/reviewer/applications/[id]/review
```

Role:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

Request body:

```json
{
  "score": 85,
  "note": "Motivasi baik dan pengalaman cukup relevan."
}
```

Rules:

* Score 0 sampai 100.
* Setelah review, status application menjadi `UNDER_REVIEW`.

### 18.4 Admin API

#### Get All Applications

```txt
GET /api/admin/applications
```

Role:

```txt
ADMIN
SUPER_ADMIN
```

#### Get Application Detail

```txt
GET /api/admin/applications/[id]
```

Role:

```txt
ADMIN
SUPER_ADMIN
```

#### Update Application Status

```txt
PATCH /api/admin/applications/[id]/status
```

Role:

```txt
ADMIN
SUPER_ADMIN
```

Request body:

```json
{
  "status": "ACCEPTED"
}
```

Allowed status:

* `UNDER_REVIEW`
* `ACCEPTED`
* `REJECTED`

#### Get Users

```txt
GET /api/admin/users
```

Role:

```txt
SUPER_ADMIN
```

#### Update User Role

```txt
PATCH /api/admin/users/[id]/role
```

Role:

```txt
SUPER_ADMIN
```

Request body:

```json
{
  "role": "REVIEWER"
}
```

#### Get Activity Logs

```txt
GET /api/admin/activity-logs
```

Role:

```txt
SUPER_ADMIN
```

## 19. UI Guidelines

### 19.1 Visual Style

Style aplikasi:

* Clean dashboard.
* Modern web app.
* Simple dan rapi.
* Responsive untuk desktop dan mobile.
* Tidak terlalu banyak gradient.
* Tidak menggunakan visual cybersecurity berlebihan.
* Tidak terlihat seperti template AI.

Warna rekomendasi:

* Background: `#F8FAFC`
* Surface: `#FFFFFF`
* Surface Muted: `#F1F5F9`
* Border: `#E2E8F0`
* Text Primary: `#0F172A`
* Text Secondary: `#475569`
* Text Muted: `#64748B`
* Primary: `#1E40AF`
* Primary Hover: `#1D4ED8`
* Primary Soft: `#DBEAFE`
* Success: `#16A34A`
* Success Soft: `#DCFCE7`
* Warning: `#D97706`
* Warning Soft: `#FEF3C7`
* Danger: `#DC2626`
* Danger Soft: `#FEE2E2`

### 19.2 Landing Page Direction

Landing page harus terlihat seperti website Open Recruitment BEM UPNVJ.

Landing page harus fokus pada:

* Ajakan mendaftar.
* Informasi open recruitment.
* Bidang/kementerian/biro yang dibuka.
* Alur pendaftaran.
* CTA daftar.

Landing page tidak boleh terlihat seperti:

* Platform SaaS komersial.
* Marketplace organisasi.
* Website penyedia sistem oprec untuk banyak organisasi.
* Website keamanan jaringan.
* Halaman laporan akademik.

### 19.3 Component Guidelines

Gunakan komponen reusable untuk:

* Button.
* Input.
* Textarea.
* Select.
* Card.
* Badge.
* StatusBadge.
* Table.
* Modal.
* Sidebar.
* Navbar.
* Empty state.
* Loading state.

### 19.4 Status Badge

| Status         | Label UI | Warna  |
| -------------- | -------- | ------ |
| `DRAFT`        | Draft    | Gray   |
| `SUBMITTED`    | Terkirim | Blue   |
| `UNDER_REVIEW` | Direview | Yellow |
| `ACCEPTED`     | Diterima | Green  |
| `REJECTED`     | Ditolak  | Red    |

## 20. AI Agent Instructions

Instruksi penting untuk AI agent atau developer yang mengerjakan project:

1. Jangan mengubah nama project. Nama project adalah **Rekor**.
2. Rekor adalah website **Open Recruitment BEM UPNVJ**.
3. Rekor bukan platform umum untuk banyak organisasi.
4. Rekor bukan marketplace open recruitment.
5. Jangan membuat halaman list organisasi.
6. Jangan membuat halaman detail organisasi.
7. Jangan membuat model `Organization` untuk MVP.
8. Gunakan konsep satu periode open recruitment.
9. Gunakan istilah UI `Bidang/Kementerian/Biro`.
10. Field database `division` tetap boleh digunakan.
11. Data bidang bersifat simulasi dan bisa diganti jika struktur resmi tersedia.
12. Jangan klaim data bidang sebagai struktur resmi terbaru jika belum diverifikasi.
13. Landing page harus fokus mengajak pendaftar mengikuti Open Recruitment BEM UPNVJ.
14. Jangan membuat landing page seperti produk SaaS penyedia sistem rekrutmen.
15. Jangan terlalu banyak menampilkan copy keamanan di UI.
16. Keamanan tetap wajib diimplementasikan di backend dan protected route.
17. Gunakan **Next.js App Router**.
18. Gunakan **TypeScript**.
19. Gunakan **Prisma** untuk database.
20. Gunakan **PostgreSQL** sebagai database.
21. Gunakan **bcryptjs** untuk password hashing.
22. Gunakan **database session + httpOnly cookie** untuk session management.
23. Jangan gunakan localStorage untuk menyimpan token auth.
24. Jangan gunakan JWT kecuali diminta secara eksplisit.
25. Jangan membuat backend repository terpisah.
26. API dibuat di dalam `src/app/api`.
27. Validasi role wajib dilakukan di server.
28. Jangan hanya mengandalkan validasi role di frontend.
29. Jangan return `passwordHash` ke client.
30. Jangan menampilkan detail error database ke client.
31. Semua fitur admin harus divalidasi dengan `requireRole`.
32. Applicant hanya boleh mengakses application miliknya sendiri.
33. Semua aktivitas penting harus masuk ke activity log.
34. Fitur file upload asli tidak wajib untuk MVP. Gunakan `cvUrl` dan `portfolioUrl`.
35. Prioritaskan MVP yang aman dan jalan dibanding fitur banyak tapi tidak selesai.
36. Jaga konsistensi naming route, schema, dan role.
37. Jangan membuat fitur di luar scope PRD tanpa konfirmasi.
38. Jika ragu, ikuti dokumen PRD ini sebagai sumber utama.

## 21. MVP Scope

Fitur yang wajib selesai untuk MVP:

* Landing page Open Recruitment BEM UPNVJ.
* Register.
* Login.
* Logout.
* Session management.
* Dashboard berdasarkan role.
* Applicant application form.
* Pilihan bidang/kementerian/biro.
* My application page.
* Reviewer applications page.
* Review application.
* Admin applications page.
* Update application status.
* Super admin user management.
* Activity log.
* Protected route.
* RBAC.
* Basic security testing.

## 22. Security Testing Checklist

| Test Case                                     | Expected Result                               |
| --------------------------------------------- | --------------------------------------------- |
| Register dengan email baru                    | Berhasil                                      |
| Register dengan email yang sama               | Ditolak                                       |
| Login dengan password benar                   | Berhasil                                      |
| Login dengan password salah                   | Ditolak                                       |
| Password di database                          | Berbentuk hash                                |
| Akses `/dashboard` tanpa login                | Redirect ke `/login`                          |
| Akses `/admin/applications` sebagai applicant | Redirect ke `/unauthorized` atau response 403 |
| Akses API admin sebagai applicant             | Response 403                                  |
| Logout lalu akses dashboard                   | Ditolak                                       |
| Manipulasi status dari applicant              | Ditolak                                       |
| Reviewer submit score di luar 0-100           | Ditolak                                       |
| Cookie session                                | Menggunakan httpOnly                          |
| Activity log setelah login                    | Tercatat                                      |
| Activity log setelah update status            | Tercatat                                      |
| Applicant mengakses data applicant lain       | Ditolak                                       |

## 23. Success Criteria

Project dianggap berhasil jika:

1. User bisa register dan login.
2. Password tersimpan dalam bentuk hash.
3. Session berjalan menggunakan cookie.
4. User tidak login tidak bisa mengakses route protected.
5. Role yang tidak sesuai tidak bisa mengakses halaman/API tertentu.
6. Applicant bisa mengisi dan submit pendaftaran.
7. Applicant bisa memilih bidang/kementerian/biro.
8. Reviewer bisa memberikan review.
9. Admin bisa update status pendaftar.
10. Super admin bisa mengubah role user.
11. Activity log mencatat aktivitas penting.
12. Aplikasi bisa dijelaskan dalam laporan sebagai implementasi keamanan layer 5, 6, dan 7.
13. Aplikasi dapat diuji menggunakan checklist security testing sederhana.

## 24. Team Members

| Nama                           | NIM        |
| ------------------------------ | ---------- |
| Rafid Abdan Syakur             | 2410512141 |
| Fathi Muhammad Luthfi Cardiana | 2410512142 |
| Khaliz Kanigara Fathi Gunawan  | 2410512151 |
| Muhammad Adla Fayyaz Fauzy     | 2410512154 |
| Muhammad Syauqi Rabbani        | 2410512166 |

## 25. Notes

Project ini dibuat untuk kebutuhan akademik, yaitu UAS Mata Kuliah Keamanan Jaringan.

Prioritas utama project adalah:

1. Fitur utama rekrutmen berjalan.
2. Implementasi keamanan dapat dibuktikan.
3. Struktur code mudah dipahami.
4. Laporan dapat menjelaskan hubungan antara fitur aplikasi dan aspek keamanan jaringan.
5. UI tetap terasa seperti website Open Recruitment BEM UPNVJ, bukan website laporan keamanan.
