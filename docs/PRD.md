# PRD.md - Rekor

## 1. Product Overview

**Rekor** adalah singkatan dari **Rekrut Organisasi**.

Rekor adalah aplikasi web untuk mengelola proses rekrutmen anggota atau staff organisasi secara aman, terstruktur, dan mudah digunakan. Aplikasi ini dibuat sebagai **Project UAS Mata Kuliah Keamanan Jaringan**.

Fokus utama project ini bukan hanya membuat fitur rekrutmen, tetapi juga mengimplementasikan mekanisme keamanan aplikasi web seperti:

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

> **Rekor - Rekrut Organisasi**

Mahasiswa melakukan audit keamanan sederhana terhadap aplikasi Rekor, kemudian merancang dan mengimplementasikan mekanisme keamanan pada layer 5, 6, dan 7 OSI.

## 3. Goals

Tujuan utama aplikasi Rekor:

1. Menyediakan sistem rekrutmen organisasi berbasis web.
2. Memudahkan pendaftar untuk register, login, mengisi form, dan melihat status seleksi.
3. Memudahkan reviewer untuk melihat dan menilai pendaftar.
4. Memudahkan admin untuk mengelola pendaftar dan status seleksi.
5. Memudahkan super admin untuk mengelola user, role, dan activity log.
6. Mengimplementasikan keamanan aplikasi web sesuai kebutuhan tugas Keamanan Jaringan.

## 4. Non-Goals

Hal-hal yang tidak menjadi prioritas pada versi awal:

1. Sistem email notification.
2. Upload file asli ke cloud storage.
3. Integrasi OAuth seperti Google Login.
4. Payment atau sistem pembayaran.
5. Multi organisasi.
6. Chat realtime.
7. Fitur interview scheduling kompleks.
8. Dashboard analytics lanjutan.

Untuk MVP, CV dan portofolio cukup menggunakan input URL.

## 5. Target Users

### 5.1 Applicant

Pendaftar organisasi.

Kebutuhan:

* Membuat akun.
* Login.
* Mengisi form pendaftaran.
* Menyimpan draft pendaftaran.
* Submit pendaftaran.
* Melihat status seleksi.

### 5.2 Reviewer

Penilai pendaftar.

Kebutuhan:

* Login.
* Melihat daftar pendaftar yang perlu direview.
* Melihat detail data pendaftar.
* Memberikan nilai dan catatan.
* Submit hasil review.

### 5.3 Admin

Pengelola rekrutmen.

Kebutuhan:

* Login.
* Melihat semua data pendaftar.
* Filter pendaftar berdasarkan status atau divisi.
* Mengubah status pendaftar.
* Melihat hasil review dari reviewer.

### 5.4 Super Admin

Pengelola tertinggi sistem.

Kebutuhan:

* Login.
* Melihat semua user.
* Mengubah role user.
* Melihat activity log.
* Mengelola akses sistem.

## 6. User Roles

Role yang digunakan dalam aplikasi:

| Role          | Deskripsi                                    |
| ------------- | -------------------------------------------- |
| `APPLICANT`   | Pendaftar organisasi.                        |
| `REVIEWER`    | Penilai pendaftar.                           |
| `ADMIN`       | Pengelola data pendaftar dan status seleksi. |
| `SUPER_ADMIN` | Pengelola user, role, dan activity log.      |

## 7. Role Based Access Control

### 7.1 Public Access

Halaman yang dapat diakses tanpa login:

| Route           | Deskripsi             |
| --------------- | --------------------- |
| `/`             | Landing page          |
| `/login`        | Login                 |
| `/register`     | Register              |
| `/unauthorized` | Halaman akses ditolak |

### 7.2 Applicant Access

Role: `APPLICANT`

| Route             | Akses       |
| ----------------- | ----------- |
| `/dashboard`      | Bisa akses  |
| `/apply`          | Bisa akses  |
| `/my-application` | Bisa akses  |
| `/reviewer/*`     | Tidak boleh |
| `/admin/*`        | Tidak boleh |

### 7.3 Reviewer Access

Role: `REVIEWER`

| Route                         | Akses       |
| ----------------------------- | ----------- |
| `/dashboard`                  | Bisa akses  |
| `/reviewer/applications`      | Bisa akses  |
| `/reviewer/applications/[id]` | Bisa akses  |
| `/admin/*`                    | Tidak boleh |
| `/apply`                      | Tidak boleh |

### 7.4 Admin Access

Role: `ADMIN`

| Route                      | Akses                      |
| -------------------------- | -------------------------- |
| `/dashboard`               | Bisa akses                 |
| `/admin/applications`      | Bisa akses                 |
| `/admin/applications/[id]` | Bisa akses                 |
| `/admin/users`             | Tidak boleh                |
| `/reviewer/applications`   | Bisa akses jika dibutuhkan |
| `/apply`                   | Tidak boleh                |

### 7.5 Super Admin Access

Role: `SUPER_ADMIN`

| Route                 | Akses      |
| --------------------- | ---------- |
| Semua route protected | Bisa akses |

## 8. Main Features

## 8.1 Landing Page

Route:

```txt
/
```

Isi halaman:

* Nama aplikasi: Rekor.
* Kepanjangan: Rekrut Organisasi.
* Deskripsi singkat aplikasi.
* CTA ke login dan register.
* Highlight keamanan:

  * Secure login.
  * Role based access.
  * Protected data.
  * Activity log.

Acceptance criteria:

* User dapat melihat informasi aplikasi.
* User dapat menuju halaman login.
* User dapat menuju halaman register.

## 8.2 Register

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

## 8.3 Login

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
* User diarahkan ke dashboard sesuai role.

## 8.4 Logout

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

## 8.5 Dashboard

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

## 8.6 Application Form

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
* Division
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
* Applicant tidak bisa mengakses application milik user lain.
* Applicant tidak bisa mengubah status secara ilegal dari frontend atau API.

## 8.7 My Application

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
* Divisi yang dipilih.

Acceptance criteria:

* Applicant hanya melihat application miliknya sendiri.
* Jika belum punya application, tampilkan empty state.
* Status tampil jelas.

## 8.8 Reviewer Applications

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
* Filter division.
* Filter status.
* Tombol detail/review.

Acceptance criteria:

* Reviewer dapat melihat daftar pendaftar.
* Reviewer tidak dapat mengubah status final.
* Reviewer dapat masuk ke detail application.

## 8.9 Reviewer Application Detail

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

## 8.10 Admin Applications

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
* Filter division.
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

## 8.11 User Management

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

## 8.12 Activity Log

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

## 9. Security Requirements

## 9.1 Password Hashing

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

## 9.2 Session Management

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

## 9.3 RBAC

Rules:

* Validasi role wajib dilakukan di server.
* Frontend hanya boleh digunakan untuk menyembunyikan UI, bukan sebagai sumber keamanan utama.
* API admin harus memanggil helper seperti `requireRole`.
* Applicant hanya boleh mengakses data miliknya sendiri.

## 9.4 Protected Route

Rules:

* Halaman protected harus redirect ke `/login` jika user belum login.
* Jika user login tetapi tidak punya role yang sesuai, redirect ke `/unauthorized`.

## 9.5 HTTPS/TLS

Rules:

* Saat production, aplikasi harus berjalan di HTTPS.
* Cookie production harus menggunakan `secure: true`.
* Deployment di Vercel atau platform lain yang menyediakan HTTPS otomatis diperbolehkan.

## 9.6 Input Validation

Rules:

* Semua request body harus divalidasi.
* Email harus format email.
* Password minimal 8 karakter.
* Score harus angka 0 sampai 100.
* URL CV/portfolio harus valid URL jika diisi.
* Jangan percaya data dari client.

Recommended:

* Gunakan Zod untuk validasi schema request.

## 9.7 Error Handling

Rules:

* Jangan tampilkan detail error database ke client.
* Login gagal harus menggunakan message umum:

```txt
Invalid email or password
```

* Jangan beri tahu apakah email terdaftar atau password salah pada proses login.

## 10. OSI Layer Mapping

| Layer                  | Implementasi                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| Layer 5 - Session      | Cookie session, session expiration, logout, database session         |
| Layer 6 - Presentation | Password hashing, HTTPS/TLS, perlindungan data saat transmisi        |
| Layer 7 - Application  | Login, logout, RBAC, protected route, input validation, activity log |

## 11. ISO 27001 Control Mapping

| Area Kontrol           | Implementasi di Rekor                                     |
| ---------------------- | --------------------------------------------------------- |
| Access Control         | RBAC, protected route, role validation                    |
| Authentication         | Login email dan password                                  |
| Cryptography           | bcrypt password hashing, HTTPS/TLS                        |
| Logging and Monitoring | Activity log                                              |
| Secure Development     | Validasi input, error handling, server-side authorization |
| User Access Management | Role management oleh super admin                          |

## 12. Tech Stack

## 12.1 Core Stack

* **Next.js** sebagai framework utama.
* **TypeScript** untuk type safety.
* **Tailwind CSS** untuk styling.
* **Prisma ORM** untuk database access.
* **PostgreSQL** sebagai database.
* **bcryptjs** untuk password hashing.
* **Cookie session** untuk session management.

## 12.2 Development Tools

* **npm** atau **Bun** untuk package manager.
* **Git** untuk version control.
* **GitHub** untuk repository.
* **Husky** untuk Git hooks.
* **ESLint** untuk linting.
* **VS Code** sebagai code editor.

## 13. Database Schema

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

## 14. Suggested Folder Structure

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

## 15. API Requirements

## 15.1 Auth API

### Register

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

Response success:

```json
{
  "message": "Register success",
  "data": {
    "id": "user_id",
    "name": "Khaliz Kanigara",
    "email": "khaliz@example.com",
    "role": "APPLICANT"
  }
}
```

### Login

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

Response success:

```json
{
  "message": "Login success",
  "data": {
    "id": "user_id",
    "name": "Khaliz Kanigara",
    "email": "khaliz@example.com",
    "role": "APPLICANT"
  }
}
```

### Me

```txt
GET /api/auth/me
```

Response success:

```json
{
  "message": "Authenticated",
  "data": {
    "id": "user_id",
    "name": "Khaliz Kanigara",
    "email": "khaliz@example.com",
    "role": "APPLICANT"
  }
}
```

### Logout

```txt
POST /api/auth/logout
```

Response success:

```json
{
  "message": "Logout success"
}
```

## 15.2 Application API

### Create or Update Draft

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
  "division": "Product & Tech",
  "motivation": "Saya ingin bergabung untuk mengembangkan kemampuan dan berkontribusi dalam organisasi.",
  "cvUrl": "https://example.com/cv.pdf",
  "portfolioUrl": "https://example.com/portfolio"
}
```

### Submit Application

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

### Get My Application

```txt
GET /api/applications/me
```

Role:

```txt
APPLICANT
```

Rules:

* Hanya return application milik user login.

## 15.3 Reviewer API

### Get Reviewable Applications

```txt
GET /api/reviewer/applications
```

Role:

```txt
REVIEWER
ADMIN
SUPER_ADMIN
```

### Review Application

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

## 15.4 Admin API

### Get All Applications

```txt
GET /api/admin/applications
```

Role:

```txt
ADMIN
SUPER_ADMIN
```

### Update Application Status

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

### Get Users

```txt
GET /api/admin/users
```

Role:

```txt
SUPER_ADMIN
```

### Update User Role

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

## 16. UI Guidelines

## 16.1 Visual Style

Style aplikasi:

* Clean dashboard.
* Modern SaaS style.
* Simple dan rapi.
* Responsive untuk desktop dan mobile.

Warna rekomendasi:

* Primary: blue atau navy.
* Background: white atau light gray.
* Success: green.
* Warning: yellow/orange.
* Danger: red.
* Text: dark gray.

## 16.2 Component Guidelines

Gunakan komponen reusable untuk:

* Button.
* Input.
* Textarea.
* Select.
* Card.
* Badge status.
* Table.
* Modal.
* Sidebar.
* Navbar.
* Empty state.
* Loading state.

## 16.3 Status Badge

Gunakan badge untuk status:

| Status         | Warna  |
| -------------- | ------ |
| `DRAFT`        | Gray   |
| `SUBMITTED`    | Blue   |
| `UNDER_REVIEW` | Yellow |
| `ACCEPTED`     | Green  |
| `REJECTED`     | Red    |

## 17. AI Agent Instructions

Instruksi penting untuk AI agent atau developer yang mengerjakan project:

1. Jangan mengubah nama project. Nama project adalah **Rekor**.
2. Jangan mengubah konsep utama. Rekor adalah aplikasi **Rekrut Organisasi**.
3. Jangan mengganti stack utama tanpa alasan kuat.
4. Gunakan **Next.js App Router**.
5. Gunakan **TypeScript**.
6. Gunakan **Prisma** untuk database.
7. Gunakan **PostgreSQL** sebagai database.
8. Gunakan **bcryptjs** untuk password hashing.
9. Gunakan **database session + httpOnly cookie** untuk session management.
10. Jangan gunakan localStorage untuk menyimpan token auth.
11. Jangan gunakan JWT kecuali diminta secara eksplisit.
12. Jangan membuat backend repository terpisah.
13. API dibuat di dalam `src/app/api`.
14. Validasi role wajib dilakukan di server.
15. Jangan hanya mengandalkan validasi role di frontend.
16. Jangan return `passwordHash` ke client.
17. Jangan menampilkan detail error database ke client.
18. Semua fitur admin harus divalidasi dengan `requireRole`.
19. Applicant hanya boleh mengakses application miliknya sendiri.
20. Semua aktivitas penting harus masuk ke activity log.
21. Fitur file upload asli tidak wajib untuk MVP. Gunakan `cvUrl` dan `portfolioUrl`.
22. Prioritaskan MVP yang aman dan jalan dibanding fitur banyak tapi tidak selesai.
23. Jaga konsistensi naming route, schema, dan role.
24. Jangan membuat fitur di luar scope PRD tanpa konfirmasi.
25. Jika ragu, ikuti dokumen PRD ini sebagai sumber utama.

## 18. MVP Scope

Fitur yang wajib selesai untuk MVP:

* Landing page.
* Register.
* Login.
* Logout.
* Session management.
* Dashboard berdasarkan role.
* Applicant application form.
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

## 19. Security Testing Checklist

Checklist pengujian:

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

## 20. Success Criteria

Project dianggap berhasil jika:

1. User bisa register dan login.
2. Password tersimpan dalam bentuk hash.
3. Session berjalan menggunakan cookie.
4. User tidak login tidak bisa mengakses route protected.
5. Role yang tidak sesuai tidak bisa mengakses halaman/API tertentu.
6. Applicant bisa mengisi dan submit pendaftaran.
7. Reviewer bisa memberikan review.
8. Admin bisa update status pendaftar.
9. Super admin bisa mengubah role user.
10. Activity log mencatat aktivitas penting.
11. Aplikasi bisa dijelaskan dalam laporan sebagai implementasi keamanan layer 5, 6, dan 7.
12. Aplikasi dapat diuji menggunakan checklist security testing sederhana.

## 21. Team Members

| Nama                           | NIM        |
| ------------------------------ | ---------- |
| Rafid Abdan Syakur             | 2410512141 |
| Fathi Muhammad Luthfi Cardiana | 2410512142 |
| Khaliz Kanigara Fathi Gunawan  | 2410512151 |
| Muhammad Adla Fayyaz Fauzy     | 2410512154 |
| Muhammad Syauqi Rabbani        | 2410512166 |

## 22. Notes

Project ini dibuat untuk kebutuhan akademik, yaitu UAS Mata Kuliah Keamanan Jaringan.

Prioritas utama project adalah:

1. Fitur utama rekrutmen berjalan.
2. Implementasi keamanan dapat dibuktikan.
3. Struktur code mudah dipahami.
4. Laporan dapat menjelaskan hubungan antara fitur aplikasi dan aspek keamanan jaringan.
