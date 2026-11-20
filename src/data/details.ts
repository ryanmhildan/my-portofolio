// Long-form content for each project's detail page, taken from the projects' own READMEs.
// Kept apart from content.ts so the cards stay short and this file can grow freely.

type L = { id: string; en: string };
const l = (id: string, en: string): L => ({ id, en });

export type Shot = { src: string; alt: L; caption: L; width: number; height: number };

export type DetailSource = {
  overview: L[];
  sections: { title: L; items: L[] }[];
  gallery?: Shot[];
  /** Extra outbound links beyond the repos and demo, e.g. a release download. */
  links?: { label: L; href: string }[];
  /** Plain caveat shown at the end, when the project needs one. */
  note?: L;
};

const shot = (src: string, width: number, height: number, alt: L, caption: L): Shot => ({ src, width, height, alt, caption });

export const details: Record<string, DetailSource> = {
  "rice-harvest": {
    overview: [
      l(
        "Skripsi saya berjudul \"Deteksi dan Pemetaan Kesiapan Panen Padi Menggunakan Citra Drone Berbasis Edge Computing dan Sistem Informasi Geografis (SIG)\". Foto drone sawah diolah di satu laptop menjadi peta yang menunjukkan bagian mana yang sudah matang, lengkap dengan verdict siap panen dan file GeoTIFF yang bisa diunduh.",
        "My thesis is titled \"Detecting and Mapping Rice Harvest Readiness from Drone Imagery with Edge Computing and a Geographic Information System (GIS)\". Drone photos of a paddy are processed on a single laptop into a map of which parts are ripe, with a harvest verdict and downloadable GeoTIFF files.",
      ),
      l(
        "Stitching, segmentasi, dan ekspor berjalan offline dari awal sampai akhir. Internet hanya dipakai untuk memuat tile OpenStreetMap di latar peta, dan tanpa internet pun layer orthophoto dan klasifikasi tetap tampil.",
        "Stitching, segmentation, and export run offline from start to finish. The internet is only used to load OpenStreetMap tiles behind the map, and without it the orthophoto and classification layers still show.",
      ),
      l(
        "Saya memakai segmentasi HSV, bukan deep learning: kematangan padi terlihat jelas dari pergeseran warna kanopi dari hijau ke kuning, prosesnya cepat di laptop tanpa GPU, dan setiap keputusan bisa dijelaskan dari angka threshold.",
        "I used HSV segmentation rather than deep learning: rice ripeness shows clearly as the canopy shifts from green to yellow, it runs fast on a laptop without a GPU, and every decision can be explained from the threshold values.",
      ),
    ],
    sections: [
      {
        title: l("Alur pengolahan", "Processing pipeline"),
        items: [
          l("Foto drone (JPG dengan GPS di EXIF, overlap 70–80%) dijahit NodeODM menjadi orthophoto GeoTIFF ber-georeferensi, target 5 cm/piksel.", "Drone photos (JPG with GPS in EXIF, 70–80% overlap) are stitched by NodeODM into a georeferenced GeoTIFF orthophoto, targeting 5 cm per pixel."),
          l("Pra-pemrosesan Gaussian Blur dan CLAHE, lalu konversi RGB ke HSV.", "Gaussian Blur and CLAHE preprocessing, then RGB to HSV conversion."),
          l("Threshold HSV menghasilkan mask kuning (matang) dan hijau (belum matang), dirapikan dengan morfologi. Rentang hue keduanya sengaja tidak beririsan.", "HSV thresholds produce a yellow (ripe) and a green (unripe) mask, cleaned with morphology. The two hue ranges deliberately do not overlap."),
          l("Persentase kuning terhadap total piksel padi dibandingkan dengan ambang 60%, untuk seluruh orthophoto. Ambangnya bisa diubah per request.", "The yellow share of all rice pixels is compared against a 60% threshold, across the whole orthophoto. The threshold can be changed per request."),
          l("Keluaran: orthophoto dan klasifikasi GeoTIFF (bisa langsung dibuka di QGIS), PNG overlay untuk Leaflet, peta PNG 300 DPI untuk laporan, dan JSON hasil.", "Outputs: orthophoto and classification GeoTIFFs (they open in QGIS as-is), PNG overlays for Leaflet, a 300 DPI PNG map for reports, and a JSON result."),
        ],
      },
      {
        title: l("Backend (FastAPI)", "Backend (FastAPI)"),
        items: [
          l("12 endpoint REST: stitching, status job, klasifikasi, upload manual, daftar hasil, unduh file, riwayat per lahan, health check, dan status NodeODM.", "12 REST endpoints: stitching, job status, classification, manual upload, result list, file download, per-field history, health check, and NodeODM status."),
          l("Stitching berjalan sebagai job asinkron karena bisa memakan 10 menit sampai beberapa jam. Klasifikasi biasanya selesai di bawah satu menit.", "Stitching runs as an asynchronous job because it can take 10 minutes to several hours. Classification usually finishes in under a minute."),
          l("Riwayat deteksi disimpan per lahan di SQLite.", "Detection history is stored per field in SQLite."),
          l("Pipeline yang sama bisa dijalankan tanpa server lewat CLI, dan ada tes instalasi serta smoke test endpoint.", "The same pipeline runs without the server through a CLI, with an install check and an endpoint smoke test."),
          l("Notebook riset menyimpan kalibrasi threshold: uji sensitivitas hue, histogram sebaran hue, dan rekap studi kasus dua lahan.", "A research notebook keeps the threshold calibration: hue sensitivity tests, hue histograms, and a two-field case study."),
        ],
      },
      {
        title: l("Frontend (Next.js)", "Frontend (Next.js)"),
        items: [
          l("7 halaman: beranda, upload, progres stitching, daftar hasil, detail hasil dengan peta, riwayat per lahan, dan status sistem.", "7 pages: home, upload, stitching progress, result list, result detail on a map, per-field history, and system status."),
          l("Dua mode upload: foto drone mentah, atau hasil yang sudah diproses di luar sistem.", "Two upload modes: raw drone photos, or results already processed outside the system."),
          l("Peta Leaflet di atas OpenStreetMap dengan auto-zoom ke batas lahan. Layer orthophoto dan klasifikasi bisa dinyalakan terpisah, opasitasnya diatur dengan slider.", "A Leaflet map over OpenStreetMap that zooms to the field bounds. The orthophoto and classification layers toggle separately, with an opacity slider."),
          l("Next.js 15, React 19, TypeScript, Tailwind CSS, dan Leaflet.", "Next.js 15, React 19, TypeScript, Tailwind CSS, and Leaflet."),
        ],
      },
    ],
    gallery: [
      shot("/projects/rice/web-hasil-peta.png", 1440, 900,
        l("Halaman detail hasil: layer klasifikasi di atas peta, verdict SIAP PANEN 74,23%, dan panel statistik", "Result detail page: classification layer over the map, a READY TO HARVEST verdict at 74.23%, and a statistics panel"),
        l("Detail hasil: verdict, statistik, dan unduhan GeoTIFF di atas peta", "Result detail: verdict, statistics, and GeoTIFF downloads over the map")),
      shot("/projects/rice/web-upload.png", 1440, 870,
        l("Halaman upload dengan dua mode", "Upload page with two modes"),
        l("Upload: foto drone mentah atau hasil manual", "Upload: raw drone photos or a manual result")),
      shot("/projects/rice/api-orthophoto.jpg", 1200, 1040,
        l("Orthophoto sawah hasil stitching foto drone", "Paddy orthophoto stitched from drone photos"),
        l("Orthophoto hasil stitching NodeODM", "Orthophoto stitched by NodeODM")),
      shot("/projects/rice/api-klasifikasi.jpg", 1200, 1040,
        l("Orthophoto yang sama dengan overlay kuning pada padi matang dan hijau pada padi belum matang", "The same orthophoto with yellow over ripe rice and green over unripe rice"),
        l("Klasifikasi per piksel: kuning matang, hijau belum matang", "Per-pixel classification: yellow ripe, green unripe")),
      shot("/projects/rice/api-siap-panen.jpg", 1200, 1070,
        l("Peta verdict SIAP PANEN: 74,2% kuning", "READY TO HARVEST verdict map: 74.2% yellow"),
        l("Siap panen: 74,2% kuning, 14,2 poin di atas ambang", "Ready: 74.2% yellow, 14.2 points above the threshold")),
      shot("/projects/rice/api-belum-siap.jpg", 1200, 627,
        l("Peta verdict BELUM SIAP PANEN: 19,8% kuning", "NOT READY verdict map: 19.8% yellow"),
        l("Belum siap: 19,8% kuning, sebagian besar petak masih hijau", "Not ready: 19.8% yellow, most plots still green")),
      shot("/projects/rice/web-hasil-list.png", 1440, 1000,
        l("Daftar kartu hasil klasifikasi dengan verdict dan persentase", "Result cards with verdict and percentage"),
        l("Semua hasil klasifikasi", "All classification results")),
      shot("/projects/rice/web-riwayat.png", 1440, 750,
        l("Tabel riwayat deteksi dengan filter lahan", "Detection history table with a field filter"),
        l("Riwayat deteksi per lahan", "Detection history per field")),
    ],
    note: l(
      "Sistem ini membaca warna kanopi, bukan kadar air gabah. Hasilnya alat bantu keputusan, bukan pengganti petani yang turun ke sawah.",
      "The system reads canopy colour, not grain moisture. Its result supports a decision; it does not replace a farmer walking the field.",
    ),
  },

  rabmate: {
    overview: [
      l(
        "RABmate AI membantu tim estimasi, proyek, dan keuangan menyusun Rencana Anggaran Biaya dan dokumen yang mengikutinya: penawaran, invoice, SPK, dan BAST. Dipakai untuk berbagai jenis proyek, dari konstruksi dan fabrikasi sampai IT dan jasa profesional.",
        "RABmate AI helps estimating, project, and finance teams draft cost estimates (RAB) and the documents that follow them: quotations, invoices, work orders (SPK), and handover reports (BAST). It covers many kinds of projects, from construction and fabrication to IT and professional services.",
      ),
      l(
        "Tiga prinsip dipegang di seluruh aplikasi: angka dihitung server, setiap harga punya sumber, dan AI hanya membantu sementara manusia yang memutuskan.",
        "Three principles run through the whole app: numbers are computed on the server, every price has a source, and the AI only assists while people make the decisions.",
      ),
    ],
    sections: [
      {
        title: l("Modul", "Modules"),
        items: [
          l("RAB: item material, jasa, upah, dan peralatan; pajak dan diskon; versi, perbandingan versi, approval; impor dan ekspor XLSX.", "Estimates: material, service, labour, and equipment items; tax and discounts; versions, version comparison, approval; XLSX import and export."),
          l("Katalog harga dengan riwayat per item, pemasok, referensi, dan verifikasi oleh approver.", "A price catalogue with per-item history, suppliers, references, and approver verification."),
          l("Dokumen terbit dengan nomor resmi, snapshot beku, kode verifikasi di tiap halaman, dan pratinjau PDF di dalam web.", "Issued documents with official numbers, frozen snapshots, a verification code on every page, and in-browser PDF preview."),
          l("Penawaran dengan termin, invoice per termin, dan pembayaran parsial dengan sisa tagihan.", "Quotations with payment terms, invoices per term, and partial payments with outstanding balances."),
          l("SPK dari penawaran yang diterima, dan BAST sebagian atau akhir dengan kontrol volume kumulatif.", "Work orders from accepted quotations, and partial or final handovers with cumulative volume control."),
        ],
      },
      {
        title: l("Asisten AI lokal", "Local AI assistant"),
        items: [
          l("Berjalan di komputer pengguna lewat Hermes Agent dan Ollama, tanpa cadangan cloud.", "Runs on the user's machine through Hermes Agent and Ollama, with no cloud fallback."),
          l("Membuat draft item RAB dari deskripsi dan mengekstrak item dari berkas PDF, XLSX, atau CSV dengan rujukan halaman dan baris.", "Drafts estimate items from a description and extracts items from PDF, XLSX, or CSV files with page and row references."),
          l("Chat proyek menjawab dari data proyek dengan kutipan sumber; setiap jawaban diperiksa kode dan ditandai bila meragukan.", "Project chat answers from project data with cited sources; every answer is checked in code and flagged when doubtful."),
          l("Hanya membaca lewat tool read-only: tidak pernah mengubah RAB atau menerbitkan dokumen.", "Reads only through read-only tools: it never edits an estimate or issues a document."),
        ],
      },
      {
        title: l("Teknologi dan keamanan", "Stack and security"),
        items: [
          l("Frontend Next.js 16, TypeScript strict, TanStack Query, React Hook Form dan Zod.", "Next.js 16 frontend, strict TypeScript, TanStack Query, React Hook Form and Zod."),
          l("Backend FastAPI, SQLAlchemy 2, Alembic, ReportLab untuk PDF, PostgreSQL 17 di Docker.", "FastAPI backend, SQLAlchemy 2, Alembic, ReportLab for PDFs, PostgreSQL 17 in Docker."),
          l("Sesi server-side dengan token CSRF, kata sandi Argon2id, dan isolasi data per organisasi di setiap query.", "Server-side sessions with CSRF tokens, Argon2id passwords, and per-organisation data isolation on every query."),
          l("534 tes backend dan 188 tes frontend, termasuk tes penerimaan MVP 11 langkah.", "534 backend tests and 188 frontend tests, including an 11-step MVP acceptance test."),
        ],
      },
    ],
    gallery: [
      shot("/projects/rabmate/rab.jpg", 800, 513, l("Ruang kerja RAB", "Estimate workspace"), l("Ruang kerja RAB: versi, item bersumber, dan ringkasan biaya.", "Estimate workspace: versions, sourced items, and the cost summary.")),
      shot("/projects/rabmate/chat-proyek.jpg", 800, 513, l("Chat proyek dengan asisten lokal", "Project chat with the local assistant"), l("Chat proyek: jawaban model lokal dengan kutipan sumber.", "Project chat: local model answers with cited sources.")),
      shot("/projects/rabmate/dokumen-terbit.jpg", 800, 513, l("Daftar dokumen terbit", "Issued documents"), l("Dokumen terbit: snapshot beku, berkas tersimpan, hash integritas.", "Issued documents: frozen snapshots, stored files, integrity hashes.")),
      shot("/projects/rabmate/katalog-harga.jpg", 800, 513, l("Katalog harga", "Price catalogue"), l("Katalog harga: harga terverifikasi dipisahkan dari yang terbaru.", "Price catalogue: verified prices kept apart from the latest ones.")),
    ],
  },

  "koperasi-pos": {
    overview: [
      l(
        "Koperasi POS menyatukan operasional toko dan layanan keuangan koperasi. Kasir memproses penjualan dan shift, admin mengelola stok serta simpanan dan pinjaman, dan anggota bisa melihat saldo serta angsurannya sendiri.",
        "Koperasi POS brings a cooperative's shop and its financial services into one system. Cashiers handle sales and shifts, admins manage stock along with savings and loans, and members can see their own balances and installments.",
      ),
      l(
        "Saya membangunnya bersama tim selama magang tiga bulan di PT. Sinar Mulia Plasindo Lestari.",
        "I built it with a team during a three-month internship at PT. Sinar Mulia Plasindo Lestari.",
      ),
    ],
    sections: [
      {
        title: l("Modul", "Modules"),
        items: [
          l("Kasir: buka dan tutup shift per lokasi, keranjang belanja, bayar tunai atau lewat wallet anggota, dan pintasan keyboard F1–F9.", "Point of sale: open and close shifts per location, a cart, cash or member-wallet payment, and F1–F9 keyboard shortcuts."),
          l("Inventori: produk, kategori, satuan, lokasi, harga jual, stok per lokasi, pergerakan stok, dan penerimaan barang (GRN).", "Inventory: products, categories, units, locations, selling prices, stock per location, stock movements, and goods received notes (GRN)."),
          l("Keuangan koperasi: setoran simpanan, pinjaman, jadwal dan pembayaran angsuran, serta pencairan tunai.", "Cooperative finance: savings deposits, loans, installment schedules and payments, and cash withdrawals."),
          l("Portal anggota: ringkasan akun, simpanan, pinjaman, angsuran, pencairan, dan riwayat wallet milik sendiri.", "Member portal: account summary, savings, loans, installments, withdrawals, and their own wallet history."),
          l("Laporan riwayat transaksi (dengan detail dan pembatalan) dan riwayat shift kasir.", "Transaction history reports (with detail and voiding) and cashier shift history."),
        ],
      },
      {
        title: l("Detail teknis", "Technical details"),
        items: [
          l("Laravel 11 di PHP 8.2+, dengan Livewire 3 (Volt), Laravel Breeze, Tailwind CSS, dan Vite.", "Laravel 11 on PHP 8.2+, with Livewire 3 (Volt), Laravel Breeze, Tailwind CSS, and Vite."),
          l("PostgreSQL sebagai database; beberapa migrasi memakai SQL khusus PostgreSQL.", "PostgreSQL as the database; some migrations use PostgreSQL-specific SQL."),
          l("Spatie Laravel Permission untuk peran Admin, Kasir, dan Anggota; Bavix Laravel Wallet untuk saldo simpanan dan pinjaman.", "Spatie Laravel Permission for the Admin, Cashier, and Member roles; Bavix Laravel Wallet for savings and loan balances."),
          l("Login memakai NRP, bukan email. Siap deploy ke Vercel (runtime vercel-php) atau Heroku.", "Login uses a member ID (NRP) rather than email. Ready to deploy to Vercel (vercel-php runtime) or Heroku."),
        ],
      },
    ],
    gallery: [
      shot("/projects/koperasi/pos-kasir.png", 1440, 900, l("Layar kasir dengan keranjang belanja", "Cashier screen with a cart"), l("Kasir: keranjang, total, dan pembayaran.", "Point of sale: cart, total, and payment.")),
      shot("/projects/koperasi/dashboard.png", 1440, 900, l("Dashboard sesuai peran", "Role-based dashboard"), l("Dashboard: menu sesuai peran pengguna.", "Dashboard: menus follow the user's role.")),
      shot("/projects/koperasi/stock.png", 1440, 900, l("Manajemen stok per lokasi", "Stock per location"), l("Stok per lokasi dan riwayatnya.", "Stock per location and its history.")),
      shot("/projects/koperasi/transactions.png", 1440, 900, l("Riwayat transaksi", "Transaction history"), l("Riwayat transaksi: filter tanggal, detail, dan pembatalan.", "Transaction history: date filter, detail, and voiding.")),
      shot("/projects/koperasi/simpanan.png", 1440, 900, l("Daftar setoran simpanan", "Savings deposits"), l("Simpanan: setoran pokok, wajib, dan sukarela.", "Savings: principal, mandatory, and voluntary deposits.")),
      shot("/projects/koperasi/angsuran.png", 1440, 900, l("Daftar pinjaman dan angsuran", "Loans and installments"), l("Angsuran: pinjaman aktif dan sisa saldonya.", "Installments: active loans and their remaining balance.")),
      shot("/projects/koperasi/member-summary.png", 1440, 900, l("Ringkasan akun anggota", "Member account summary"), l("Portal anggota: saldo simpanan dan pinjaman aktif.", "Member portal: savings balance and active loans.")),
      shot("/projects/koperasi/login.png", 1440, 900, l("Halaman login dengan NRP", "Login with member ID"), l("Login memakai NRP.", "Login with a member ID (NRP).")),
    ],
    note: l(
      "Tangkapan layar diambil dari instalasi lokal dengan data demo; nama produk dan anggota fiktif.",
      "Screenshots come from a local install with demo data; product and member names are made up.",
    ),
  },

  "skin-lesion": {
    overview: [
      l(
        "Proyek machine learning untuk mengklasifikasikan citra lesi kulit menjadi jinak (benign) atau ganas (malignant). Saya sengaja memakai pengolahan citra klasik, bukan deep learning, supaya setiap langkah dan setiap fitur bisa dijelaskan.",
        "A machine learning project that classifies skin lesion images as benign or malignant. I chose classic image processing over deep learning on purpose, so every step and every feature can be explained.",
      ),
      l(
        "Datasetnya Melanoma Skin Cancer Dataset of 10,605 Images dari Kaggle (Hasnain Javed), dan tidak disertakan di repository. Notebook-nya dibuat di Google Colab dan bisa dijalankan lokal.",
        "The data is the Melanoma Skin Cancer Dataset of 10,605 Images from Kaggle (Hasnain Javed), and it is not included in the repository. The notebook was written in Google Colab and also runs locally.",
      ),
    ],
    sections: [
      {
        title: l("Pipeline", "Pipeline"),
        items: [
          l("Citra diubah ke 128 × 128 piksel dan dikonversi ke RGB.", "Images are resized to 128 × 128 pixels and converted to RGB."),
          l("Segmentasi lesi dengan K-Means (k=2); cluster dengan warna rata-rata paling gelap dianggap area lesi.", "Lesions are segmented with K-Means (k=2); the cluster with the darkest mean colour is taken as the lesion."),
          l("Objek kecil di mask dibersihkan dengan operasi morfologi.", "Small objects in the mask are removed with morphological operations."),
          l("4 fitur tekstur GLCM (contrast, correlation, energy, homogeneity) dan 2 fitur bentuk (area, perimeter), dinormalisasi dengan StandardScaler.", "4 GLCM texture features (contrast, correlation, energy, homogeneity) and 2 shape features (area, perimeter), normalised with StandardScaler."),
          l("SVM kernel linear, polynomial, dan RBF dibandingkan, lalu di-tuning dengan GridSearchCV 10-fold.", "Linear, polynomial, and RBF SVM kernels are compared, then tuned with 10-fold GridSearchCV."),
        ],
      },
      {
        title: l("Hasil pada 1.000 citra uji", "Results on 1,000 test images"),
        items: [
          l("Akurasi SVM linear 79,5%, polynomial 76,9%, dan RBF 81,2%.", "Accuracy: linear SVM 79.5%, polynomial 76.9%, RBF 81.2%."),
          l("RBF setelah tuning (C=100, gamma=1): akurasi 83,0%, dengan precision, recall, dan F1 macro 0,83.", "RBF after tuning (C=100, gamma=1): 83.0% accuracy, with macro precision, recall, and F1 of 0.83."),
          l("Per kelas: recall benign 0,84 dan malignant 0,82, masing-masing 500 citra.", "Per class: benign recall 0.84 and malignant recall 0.82, 500 images each."),
          l("90 citra ganas terprediksi jinak (false negative). Jenis kesalahan inilah yang paling perlu diperhatikan dalam konteks medis.", "90 malignant images were predicted benign (false negatives). This is the error that matters most in a medical setting."),
        ],
      },
      {
        title: l("Yang akan saya perbaiki", "What I would improve"),
        items: [
          l("Cek segmentasi secara visual, karena lesi tidak selalu menjadi cluster paling gelap, misalnya pada citra bertepi gelap.", "Check the segmentation visually, since the lesion is not always the darkest cluster, for example in images with dark borders."),
          l("Pastikan StandardScaler dan tuning hanya memakai data latih agar tidak terjadi kebocoran data.", "Make sure StandardScaler and tuning only see training data, to avoid leakage."),
          l("Tambah ROC-AUC dan analisis false negative.", "Add ROC-AUC and a false-negative analysis."),
          l("Coba fitur warna dan bentuk tambahan (asimetri, kebulatan), atau CNN sebagai pembanding.", "Try colour features and more shape features (asymmetry, roundness), or a CNN to compare against."),
        ],
      },
    ],
    gallery: [
      shot("/projects/skin/segmentation_sample.png", 794, 270,
        l("Citra asli, mask lesi, dan hasil segmentasi berdampingan", "Original image, lesion mask, and segmented result side by side"),
        l("Segmentasi: citra asli, mask K-Means dan morfologi, area lesi", "Segmentation: original, K-Means and morphology mask, lesion area")),
      shot("/projects/skin/confusion_matrix.png", 539, 455,
        l("Confusion matrix SVM RBF setelah tuning", "Confusion matrix of the tuned RBF SVM"),
        l("Confusion matrix SVM RBF setelah tuning", "Confusion matrix of the tuned RBF SVM")),
    ],
    note: l(
      "Dibuat untuk pembelajaran dan portofolio. Hasil model bukan diagnosis medis dan bukan pengganti pemeriksaan tenaga medis.",
      "Built for learning and as a portfolio piece. Model output is not a medical diagnosis and does not replace an examination by a medical professional.",
    ),
  },

  applytrack: {
    overview: [
      l(
        "ApplyTrack menggantikan spreadsheet lamaran kerja. Setiap lamaran menjadi kartu di board Kanban, setiap perubahan tercatat otomatis di timeline, dan dashboard menunjukkan berapa lamaran yang dibalas, berapa yang lanjut ke interview, dan mana yang perlu di-follow-up.",
        "ApplyTrack replaces the job application spreadsheet. Each application becomes a card on a Kanban board, each change is logged in a timeline, and the dashboard shows how many applications got a reply, how many reached an interview, and which ones need a follow-up.",
      ),
      l(
        "Logika bisnisnya ada di modul murni yang tidak mengimpor Next.js maupun Prisma, jadi bisa dites langsung. Semua mutasi data lewat Server Actions, dan setiap input diparse dengan Zod di server.",
        "The business logic lives in pure modules that import neither Next.js nor Prisma, so they can be tested directly. Every data change goes through Server Actions, and every input is parsed with Zod on the server.",
      ),
    ],
    sections: [
      {
        title: l("Mengelola lamaran", "Managing applications"),
        items: [
          l("Board Kanban lima kolom: Wishlist, Applied, Interview, Offer, Rejected. Bila server gagal, kartu kembali ke posisi semula.", "A five-column Kanban board: Wishlist, Applied, Interview, Offer, Rejected. If the server fails, the card goes back where it was."),
          l("Di ponsel, kolom diganti tab status, dan kartu dipindah lewat tombol atau bottom sheet karena drag and drop tidak berjalan di layar sentuh.", "On a phone the columns become status tabs, and cards move through a button or a bottom sheet, since drag and drop does not work on touch screens."),
          l("Impor dari link LinkedIn, Glints, Kalibrr, dan job board lain. JobStreet tidak bisa dibaca dari link, jadi teks halamannya cukup disalin-tempel dan dibaca di browser.", "Import from LinkedIn, Glints, Kalibrr, and other job board links. JobStreet cannot be read from a link, so its page text is pasted in and parsed in the browser."),
          l("Bookmarklet opsional untuk situs yang memblokir impor dari server: membaca halaman yang sedang dibuka, lalu membuka form lamaran yang sudah terisi.", "An optional bookmarklet for sites that block server-side import: it reads the open page, then opens a pre-filled application form."),
          l("CV dalam PDF (maks. 2 MB) dipilih per lamaran. Hanya file berawalan %PDF- yang diterima, dan unduhannya dikirim dengan CSP sandbox.", "CVs as PDFs (up to 2 MB) are picked per application. Only files starting with %PDF- are accepted, and downloads are served with a sandbox CSP."),
        ],
      },
      {
        title: l("Insight dan pengingat", "Insights and reminders"),
        items: [
          l("Dashboard berisi total lamaran, response rate, interview rate, jumlah offer, grafik per minggu, dan distribusi pipeline.", "The dashboard shows total applications, response rate, interview rate, offers, a weekly chart, and the pipeline split."),
          l("Response rate, interview rate, dan offer per job board. Sumber dengan kurang dari 5 lamaran terkirim ditandai dan tidak dibandingkan.", "Response rate, interview rate, and offers per job board. Sources with fewer than 5 sent applications are flagged and left out of the comparison."),
          l("Pengingat email harian sekitar pukul 07.00 WIB, hanya dikirim bila ada interview atau follow-up yang jatuh tempo, dengan link berhenti langganan satu klik.", "A daily email around 07:00 WIB, sent only when an interview or follow-up is due, with a one-click unsubscribe link."),
        ],
      },
      {
        title: l("Akun dan keamanan", "Accounts and security"),
        items: [
          l("Email dan password (bcrypt) atau Google dengan OAuth + PKCE, memakai sesi JWT di cookie httpOnly.", "Email and password (bcrypt) or Google with OAuth + PKCE, using a JWT session in an httpOnly cookie."),
          l("Setelah 5 login gagal, email dikunci 15 menit, ditambah batas 20 kali gagal per IP. Penghitungnya disimpan di database supaya berlaku di banyak instance.", "After 5 failed logins an email is locked for 15 minutes, with a limit of 20 failures per IP. The counters live in the database so they hold across instances."),
          l("Cek password bocor lewat Have I Been Pwned: hanya 5 karakter awal hash SHA-1 yang dikirim.", "A breached-password check through Have I Been Pwned: only the first 5 characters of the SHA-1 hash are sent."),
          l("Setiap token membawa versi sesi pengguna. Menaikkan versi itu membatalkan semua sesi lama tanpa tabel sesi.", "Each token carries the user's session version. Bumping it revokes every old session without a session table."),
        ],
      },
      {
        title: l("Pengujian", "Testing"),
        items: [
          l("Unit test Vitest untuk statistik, aturan follow-up, urutan kartu, validasi, token, pembatasan login, impor lowongan, dan pengingat.", "Vitest unit tests for statistics, follow-up rules, card ordering, validation, tokens, login limits, job import, and reminders."),
          l("Test end-to-end Playwright untuk alur nyata di browser, dari daftar sampai unggah CV, masing-masing dengan akun baru yang dihapus setelahnya.", "Playwright end-to-end tests for real browser flows, from sign-up to CV upload, each with a fresh account that is deleted afterwards."),
          l("GitHub Actions menjalankan lint, typecheck, unit test, migrasi, build, dan test end-to-end dengan PostgreSQL 17 di setiap push ke main.", "GitHub Actions runs lint, typecheck, unit tests, migrations, build, and end-to-end tests on PostgreSQL 17 on every push to main."),
        ],
      },
    ],
    gallery: [
      shot("/projects/applytrack/dashboard.png", 1440, 1912,
        l("Dashboard ApplyTrack: KPI lamaran, grafik per minggu, pipeline, interview mendatang, dan pengingat follow-up", "ApplyTrack dashboard: application KPIs, weekly chart, pipeline, upcoming interviews, and follow-up reminders"),
        l("Dashboard: KPI, grafik per minggu, dan follow-up yang jatuh tempo", "Dashboard: KPIs, a weekly chart, and due follow-ups")),
      shot("/projects/applytrack/import.png", 1440, 1106,
        l("Form lamaran baru yang terisi dari halaman JobStreet yang ditempel", "New application form filled in from a pasted JobStreet page"),
        l("Impor: salin-tempel halaman JobStreet, form terisi sendiri", "Import: paste a JobStreet page and the form fills itself")),
      shot("/projects/applytrack/application.png", 1440, 1080,
        l("Detail lamaran dengan gaji, jadwal interview, dan timeline", "Application detail with salary, interview schedule, and timeline"),
        l("Detail lamaran dengan timeline otomatis", "Application detail with an automatic timeline")),
      shot("/projects/applytrack/insights.png", 1280, 712,
        l("Response rate, interview rate, dan offer per job board", "Response rate, interview rate, and offers per job board"),
        l("Job board mana yang paling sering membalas", "Which job boards reply most often")),
      shot("/projects/applytrack/resumes.png", 1440, 900,
        l("Halaman CV dengan response rate per versi CV", "CV page with a response rate per CV version"),
        l("Versi CV dan response rate masing-masing", "CV versions and their response rates")),
      shot("/projects/applytrack/reminder-email.png", 760, 676,
        l("Contoh email pengingat harian", "Sample daily reminder email"),
        l("Email pengingat harian", "Daily reminder email")),
    ],
    note: l(
      "Paket Free, Plus, dan Pro sudah punya batas masing-masing, tapi pembayarannya belum dibuat. Saat ini paket hanya bisa diganti di mode development.",
      "The Free, Plus, and Pro plans already have their own limits, but payment is not built yet. For now the plan can only be changed in development mode.",
    ),
  },

  "cartoon-3d-shorts": {
    overview: [
      l(
        "Dua perintah di Claude Code, satu video Shorts animasi: tokoh kartun 2D di dunia 3D bergaya lukisan, narator berbahasa Indonesia, caption per kata, musik, dan efek suara. Claude yang menulis cerita, mengecek fakta, membangun adegan, memeriksa hasilnya, lalu merender.",
        "Two commands in Claude Code, one animated Shorts video: 2D cartoon characters in a painterly 3D world, an Indonesian narrator, word-by-word captions, music, and sound effects. Claude writes the story, checks the facts, builds the scenes, reviews the result, then renders.",
      ),
      l(
        "Rumus ceritanya: cerita dulu, sains belakangan. Ada tokoh, ada situasi aneh, taruhannya naik, lalu di akhir terungkap mekanisme sains yang nyata.",
        "The story formula: story first, science last. A character, an odd situation, rising stakes, and at the end a real scientific mechanism is revealed.",
      ),
      l(
        "Pipeline look 3D dan contoh adegan dasarnya berasal dari mromidev/claude-animated-shorts (MIT). Yang saya tulis: skill naskah dan video berbahasa Indonesia, alat suara dan audio, serta sebelas video di repo.",
        "The 3D look pipeline and its base scene example come from mromidev/claude-animated-shorts (MIT). What I wrote: the Indonesian script and video skills, the voice and audio tools, and the eleven videos in the repo.",
      ),
    ],
    sections: [
      {
        title: l("Alur", "Pipeline"),
        items: [
          l("/generate-naskah menulis sampai 8 opsi naskah 120–150 kata, masing-masing dengan hook, skor bisa digambar, dan minimal dua sumber. Topik yang sudah dibuat dilewati.", "/generate-naskah writes up to 8 script options of 120–150 words, each with a hook, a drawability score, and at least two sources. Topics already made are skipped."),
          l("Angka dan tahun ditulis dengan huruf supaya narator membacanya benar.", "Numbers and years are spelled out so the narrator reads them correctly."),
          l("Suara dari ElevenLabs dengan waktu per kata. Musik dan 8–15 efek suara diletakkan tepat di kata kuncinya, lalu dicampur ke -14 LUFS. Hasil ElevenLabs di-cache, jadi menjalankan ulang tidak memakan kredit.", "The voice comes from ElevenLabs with per-word timing. Music and 8–15 sound effects land on their key words, then everything is mixed to -14 LUFS. ElevenLabs output is cached, so a rerun costs no credits."),
          l("Cek still biasanya 3–5 putaran sebelum render. Render panjang dipecah per 400 frame dengan browser baru tiap bagian.", "The still check usually takes 3–5 rounds before rendering. Long renders are split into 400-frame chunks with a fresh browser for each."),
          l("Keluaran: MP4 1080×1920 30 fps, dan upload.txt berisi ide judul, deskripsi, sumber, dan hashtag.", "Output: a 1080×1920 MP4 at 30 fps, plus an upload.txt with title ideas, a description, sources, and hashtags."),
        ],
      },
      {
        title: l("Aturan konten", "Content rules"),
        items: [
          l("Sains selalu nyata dengan minimal dua sumber, dan sumbernya ikut ditulis di deskripsi video.", "The science is always real with at least two sources, and those sources go into the video description."),
          l("Cerita fiksi ditandai fiksi, sains nyata. Tidak ada tanggal, koran, atau kutipan tokoh nyata yang dikarang.", "Fictional stories are labelled fiction, real science. No dates, newspapers, or quotes from real people are invented."),
          l("Tokoh, warna, dan desain dibuat sendiri. Model 3D dari Kenney (CC0).", "Characters, colours, and designs are original. 3D models come from Kenney (CC0)."),
        ],
      },
    ],
    gallery: [
      shot("/projects/cartoon/kapal-vasa.jpg", 360, 640,
        l("Frame video: awak kapal berbaris di dek kapal perang yang masih bersandar di pelabuhan", "Video frame: a crew lined up on the deck of a warship still moored in the harbour"),
        l("Kapal Perang yang Kalah oleh Angin", "The Warship Beaten by the Wind")),
      shot("/projects/cartoon/krakatau-suara.jpg", 360, 640,
        l("Frame video: tokoh berteropong dengan gelembung pikiran 2D berisi kapal besar", "Video frame: a character with a spyglass and a 2D thought bubble showing a large ship"),
        l("Suara Paling Keras dalam Sejarah Manusia", "The Loudest Sound in Human History")),
      shot("/projects/cartoon/kendi-keringat.jpg", 360, 640,
        l("Frame video: pori-pori tanah liat dan tetesan air dilihat lewat kaca pembesar", "Video frame: clay pores and water droplets seen through a magnifying glass"),
        l("Kendi Bocor yang Bikin Air Tetap Sejuk", "The Leaky Jar That Keeps Water Cool")),
      shot("/projects/cartoon/smong-simeulue.jpg", 360, 640,
        l("Frame video: desa rumah panggung di tepi pantai Simeulue", "Video frame: a village of stilt houses on the Simeulue shore"),
        l("Pulau yang Selamat Berkat Cerita Nenek", "The Island Saved by Grandma's Story")),
      shot("/projects/cartoon/raja-es.jpg", 360, 640,
        l("Frame video: dua tokoh di dermaga di antara balok-balok es", "Video frame: two characters on a dock among blocks of ice"),
        l("Orang yang Jualan Es ke Negeri Tropis", "The Man Who Sold Ice to the Tropics")),
      shot("/projects/cartoon/subak-wereng.jpg", 360, 640,
        l("Frame video: tokoh wereng membawa piring di depan sawah", "Video frame: a planthopper character holding a plate in front of a rice field"),
        l("Kenapa Petani Bali Menuruti Jadwal Pura", "Why Balinese Farmers Follow the Temple Calendar")),
    ],
  },

  "monday-notch": {
    overview: [
      l(
        "Notch kecil yang hidup di bagian atas layar Windows. Arahkan kursor untuk membukanya: musik dengan lirik tersinkron, kontrol cepat, timer fokus, to-do, dan catatan ada di dalamnya.",
        "A small, living notch at the top of a Windows screen. Hover it to open: music with synced lyrics, quick controls, a focus timer, to-dos, and notes live inside.",
      ),
      l(
        "Satu file .exe tanpa instalasi, karena runtime .NET sudah dibundel. Rilis dengan lisensi MIT.",
        "A single .exe with nothing to install, since the .NET runtime is bundled. Released under the MIT licence.",
      ),
    ],
    sections: [
      {
        title: l("Halaman", "Pages"),
        items: [
          l("Control Center: Wi-Fi, Bluetooth, Hotspot, mode daya, kunci, sleep, restart, snip, serta slider kecerahan dan volume.", "Control Center: Wi-Fi, Bluetooth, Hotspot, power mode, lock, sleep, restart, snip, and brightness and volume sliders."),
          l("Musik: bekerja dengan pemutar apa pun di Windows media controls, dengan lirik tersinkron dari LRCLIB. Warna notch mengikuti sampul album.", "Music: works with any player in the Windows media controls, with synced lyrics from LRCLIB. The notch takes on the album art's colours."),
          l("Fokus: timer Pomodoro 25/5 menit dengan istirahat panjang setiap empat sesi.", "Focus: a 25/5-minute Pomodoro timer with a long break every four sessions."),
          l("To-do, catatan cepat yang tersimpan otomatis, dan pengaturan.", "To-do, a quick note that saves as you type, and settings."),
        ],
      },
      {
        title: l("Notch tertutup", "Closed notch"),
        items: [
          l("Tiga slot widget: baterai, to-do, jam, tanggal, cuaca, ping, atau FPS.", "Three widget slots: battery, to-do, clock, date, weather, ping, or FPS."),
          l("Bentuk menempel di tepi atas atau mengambang, tema gelap, terang, atau mengikuti Windows.", "Anchored to the top edge or floating, in dark, light, or Windows-following theme."),
        ],
      },
      {
        title: l("Privasi", "Privacy"),
        items: [
          l("Tanpa akun dan tanpa analitik. Data hanya keluar saat fiturnya dipakai: judul lagu ke LRCLIB, lokasi kasar ke Open-Meteo, ping ke 1.1.1.1.", "No account and no analytics. Data only leaves the PC while a feature is in use: song details to LRCLIB, a rough location to Open-Meteo, a ping to 1.1.1.1."),
        ],
      },
    ],
    gallery: [
      shot("/projects/notch/music-lyrics.png", 1288, 448, l("Halaman musik dengan lirik", "Music page with lyrics"), l("Musik dengan lirik tersinkron.", "Music with synced lyrics.")),
      shot("/projects/notch/focus.png", 1012, 448, l("Timer fokus", "Focus timer"), l("Timer fokus Pomodoro.", "Pomodoro focus timer.")),
      shot("/projects/notch/todo.png", 1012, 448, l("Daftar to-do", "To-do list"), l("To-do.", "To-do list.")),
      shot("/projects/notch/settings-idle.png", 1012, 680, l("Pengaturan slot widget", "Widget slot settings"), l("Pengaturan slot dengan pratinjau langsung.", "Slot settings with a live preview.")),
    ],
    links: [{ label: l("Unduh rilis", "Download release"), href: "https://github.com/ryanmhildan/monday-notch/releases/latest" }],
  },

  "discord-lyrics": {
    overview: [
      l(
        "Aplikasi kecil yang membaca lagu yang sedang diputar di Spotify desktop dan menampilkan baris liriknya sebagai custom status Discord, bergerak mengikuti lagu.",
        "A small app that reads what is playing in the Spotify desktop app and shows the current lyric line as a Discord custom status, moving with the song.",
      ),
      l(
        "Tidak butuh API key Spotify maupun Premium, karena pemutaran dibaca dari Windows media controls. Berjalan lokal dari terminal.",
        "It needs no Spotify API key or Premium, since playback is read from the Windows media controls. It runs locally from the terminal.",
      ),
    ],
    sections: [
      {
        title: l("Cara kerja", "How it works"),
        items: [
          l("Memeriksa pemutaran Spotify setiap detik lewat Windows SMTC dan PowerShell.", "Checks Spotify playback every second through Windows SMTC and PowerShell."),
          l("Mengambil lirik tersinkron dari LRCLIB saat lagu berganti, lalu menjadwalkan tiap baris sesuai posisi lagu.", "Fetches synced lyrics from LRCLIB when the track changes, then schedules each line against the playback position."),
          l("Seek menyinkronkan ulang penjadwal; pause atau stop menghapus status.", "Seeking resyncs the scheduler; pausing or stopping clears the status."),
          l("Bila lirik tidak tersedia, status menampilkan judul dan artis.", "When lyrics are unavailable, the status shows the title and artist."),
          l("Update status Discord diantrikan dan dicoba ulang saat terkena rate limit.", "Discord status updates are queued and retried when rate-limited."),
        ],
      },
    ],
    note: l(
      "Aplikasi ini memakai token pengguna Discord yang disimpan di komputer sendiri. Otomasi dengan token pengguna bisa melanggar Ketentuan Layanan Discord, jadi risikonya ada pada pemakai.",
      "The app uses a Discord user token stored on the user's own machine. Automating with a user token may break Discord's Terms of Service, so the risk sits with whoever runs it.",
    ),
  },
};
