# Portofolio Ryan Muhammad Hildan

Website portofolio pribadi dalam bahasa Indonesia dan Inggris. Isinya proyek software dan computer vision, pengalaman, dan kontak, plus portofolio PDF yang bisa diunduh.

Dibuat dengan Next.js 16, React 19, Tailwind CSS 4, dan Framer Motion.

## Menjalankan di lokal

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka http://localhost:3000. Perintah lain:

| Perintah | Fungsi |
| --- | --- |
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | Cek ESLint |
| `npm run downloads` | Mencetak ulang portofolio PDF (lihat di bawah) |

## Deploy ke Vercel

Proyek ini tidak butuh environment variable, jadi pengaturan bawaan Vercel sudah cukup.

1. Push repo ini ke GitHub.
2. Di [vercel.com/new](https://vercel.com/new), pilih **Import** pada repo tersebut.
3. Vercel otomatis mengenali Next.js. Biarkan Build Command (`next build`) dan Output Directory apa adanya, lalu klik **Deploy**.

Setiap push ke branch `main` akan di-deploy ulang otomatis. Push ke branch lain mendapat preview URL sendiri.

## Struktur

```
src/
  app/[lang]/          halaman /id dan /en, detail proyek, dan halaman cetak PDF
  components/          section halaman (Hero, Work, Sections) dan komponen kecil
  components/visuals/  ilustrasi untuk proyek tanpa screenshot
  components/print/    slide portofolio PDF
  data/content.ts      semua teks dua bahasa: proyek, pengalaman, label UI
  data/details.ts      isi halaman detail proyek dan galeri screenshot
  proxy.ts             mengarahkan / ke /en (atau /id jika itu pilihan terakhir)
public/
  projects/            screenshot proyek
  downloads/           portofolio PDF yang bisa diunduh
scripts/
  build-downloads.mjs  mencetak PDF dari halaman cetak
```

## Mengubah isi

Semua teks ada di `src/data/content.ts` dan `src/data/details.ts`, masing-masing dalam dua bahasa (`id` dan `en`). Ubah teks di sana, bukan di komponen. Screenshot baru taruh di `public/projects/<nama-proyek>/`.

`/` dibuka dalam bahasa Inggris, kecuali pengunjung sebelumnya memilih bahasa Indonesia. Tema terang dan gelap mengikuti sistem sampai pengunjung memilih sendiri lewat tombol di header. Warna dan token tema ada di `src/app/globals.css`.

## Portofolio PDF

PDF di `public/downloads` dicetak dari halaman `/id/print/portfolio` dan `/en/print/portfolio`, yang mengambil data dari `src/data/content.ts`. PDF tidak dibuat ulang otomatis saat deploy. Setelah data proyek berubah, cetak ulang di lokal lalu commit hasilnya:

```bash
npm run build
npx next start -p 3100
```

Di terminal lain:

```bash
BASE_URL=http://localhost:3100 npm run downloads
```

Di PowerShell, set variabelnya dulu: `$env:BASE_URL="http://localhost:3100"; npm run downloads`.

Skrip ini memakai Chrome headless, atau Edge kalau Chrome tidak ada. Cetak dari hasil build seperti di atas, bukan dari `npm run dev`.

## Lisensi

Kode sumber memakai lisensi [MIT](LICENSE) © 2026 Ryan Muhammad Hildan.

Konten pribadi tidak termasuk dalam lisensi MIT: teks profil, pengalaman, dan deskripsi proyek di `src/data/`, screenshot di `public/projects/`, dan PDF di `public/downloads/`. Semua itu tetap hak cipta saya. Kalau memakai repo ini sebagai template, ganti isinya dengan konten Anda sendiri.
