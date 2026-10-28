import { details, type DetailSource } from "./details";

export const locales = ["id", "en"] as const;
export type Lang = (typeof locales)[number];
export type Track = "software" | "ai";

export const hasLocale = (value: string): value is Lang => (locales as readonly string[]).includes(value);

type L = { id: string; en: string };
const l = (id: string, en: string): L => ({ id, en });

type Visual =
  | { kind: "svm" }
  | { kind: "lyrics" }
  | { kind: "image"; src: string; alt: L; width: number; height: number; tone?: "dark"; extras?: Shot[] };

// Smaller images shown under the main one on the work card, so a tall card has no empty column.
type Shot = { src: string; alt: L; width: number; height: number };

type ProjectSource = {
  slug: string;
  title: L;
  kicker: L;
  year: string;
  tracks: Track[];
  summary: L;
  points: L[];
  stack: string[];
  facts?: { value: string | L; label: L }[];
  repos: { label: string; href: string; short?: string }[];
  live?: string;
  visual: Visual;
};

const gh = (name: string) => `https://github.com/ryanmhildan/${name}`;

const projectSource: ProjectSource[] = [
  {
    slug: "rice-harvest",
    title: l("Deteksi Kesiapan Panen Padi dari Citra Drone", "Rice Harvest Readiness from Drone Imagery"),
    kicker: l("Skripsi", "Undergraduate thesis"),
    year: "2026",
    tracks: ["ai", "software"],
    summary: l(
      "Foto drone mentah masuk, peta sawah dan verdict siap panen keluar. Sistem tiga lapis yang berjalan sepenuhnya offline di satu laptop lapangan, tanpa layanan cloud.",
      "Raw drone photos in, a field map and a harvest verdict out. A three-tier system that runs fully offline on a single field laptop, with no cloud service.",
    ),
    points: [
      l(
        "Stitching foto drone menjadi orthophoto ber-georeferensi 5 cm/piksel lewat NodeODM di Docker.",
        "Stitches drone photos into a georeferenced orthophoto at 5 cm per pixel with NodeODM in Docker.",
      ),
      l(
        "Pra-pemrosesan Gaussian Blur dan CLAHE, lalu segmentasi warna HSV untuk memisahkan padi matang dan belum matang.",
        "Gaussian Blur and CLAHE preprocessing, then HSV color segmentation to separate ripe from unripe rice.",
      ),
      l(
        "Verdict siap panen dari persentase piksel kuning dengan ambang 60%. Pada studi kasus, satu lahan terbaca 74,2% kuning (siap panen) dan lahan lain 19,8% (belum siap).",
        "A harvest verdict from the share of yellow pixels against a 60% threshold. In the case study, one field read 74.2% yellow (ready) and another 19.8% (not ready).",
      ),
      l(
        "REST API FastAPI dengan 12 endpoint, job stitching asinkron, dan riwayat deteksi per lahan di SQLite.",
        "A FastAPI REST API with 12 endpoints, asynchronous stitching jobs, and per-field detection history in SQLite.",
      ),
      l(
        "Frontend Next.js + TypeScript dengan 7 halaman, termasuk peta Leaflet dengan layer yang bisa diatur dan unduhan GeoTIFF.",
        "A Next.js + TypeScript frontend with 7 pages, including a Leaflet map with adjustable layers and GeoTIFF downloads.",
      ),
    ],
    stack: ["Python", "OpenCV", "Rasterio", "FastAPI", "SQLite", "Docker", "NodeODM", "Next.js", "Leaflet"],
    facts: [
      { value: "5 cm", label: l("per piksel", "per pixel") },
      { value: "12", label: l("endpoint REST", "REST endpoints") },
      { value: "60%", label: l("ambang siap panen", "harvest threshold") },
    ],
    repos: [
      { label: "rice-harvest-web", href: gh("rice-harvest-web"), short: "Web" },
      { label: "rice_classification_api", href: gh("rice_classification_api"), short: "API" },
    ],
    live: "https://rice-harvest-web.vercel.app",
    visual: {
      kind: "image",
      src: "/projects/rice/web-banner.jpg",
      alt: l(
        "Peta klasifikasi sawah di atas OpenStreetMap: petak kuning matang dan hijau belum matang",
        "Rice field classification map over OpenStreetMap: ripe plots in yellow, unripe in green",
      ),
      width: 1600,
      height: 741,
      extras: [
        {
          src: "/projects/rice/api-orthophoto.jpg",
          alt: l("Orthophoto sawah hasil stitching foto drone", "Paddy orthophoto stitched from drone photos"),
          width: 1200,
          height: 1040,
        },
        {
          src: "/projects/rice/api-klasifikasi.jpg",
          alt: l(
            "Orthophoto yang sama dengan overlay kuning pada padi matang dan hijau pada padi belum matang",
            "The same orthophoto with yellow over ripe rice and green over unripe rice",
          ),
          width: 1200,
          height: 1040,
        },
      ],
    },
  },
  {
    slug: "rabmate",
    title: l("RABmate AI", "RABmate AI"),
    kicker: l("Produk pribadi", "Personal product"),
    year: "2026",
    tracks: ["software", "ai"],
    summary: l(
      "Aplikasi penyusun Rencana Anggaran Biaya dan dokumen turunannya, dari penawaran sampai BAST. Asisten AI-nya berjalan lokal di komputer pengguna dan hanya membaca data, tidak pernah mengubah angka.",
      "An app for drafting cost estimates (RAB) and the documents that follow, from quotation to handover report. Its assistant runs locally on the user's machine and only reads data, it never changes a number.",
    ),
    points: [
      l(
        "Total, pajak, diskon, dan termin dihitung server dengan Decimal. Dokumen terbit dibekukan sebagai snapshot dengan hash SHA-256.",
        "Totals, tax, discounts, and payment terms are computed on the server with Decimal. Issued documents are frozen as snapshots with a SHA-256 hash.",
      ),
      l(
        "Setiap harga katalog menyimpan pemasok, referensi, dan status verifikasi.",
        "Every catalog price keeps its supplier, reference, and verification status.",
      ),
      l(
        "Asisten lokal (Hermes Agent + Ollama) untuk draft item RAB, ekstraksi item dari PDF/XLSX, dan chat proyek dengan kutipan sumber.",
        "A local assistant (Hermes Agent + Ollama) drafts line items, extracts items from PDF/XLSX files, and answers project questions with cited sources.",
      ),
      l(
        "Enam peran pengguna, isolasi data per organisasi, dan audit log.",
        "Six user roles, per-organization data isolation, and an audit log.",
      ),
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Ollama", "Docker"],
    facts: [
      { value: "534", label: l("tes backend", "backend tests") },
      { value: "188", label: l("tes frontend", "frontend tests") },
      { value: "6", label: l("peran akses", "access roles") },
    ],
    repos: [{ label: "rabmate-ai", href: gh("rabmate-ai") }],
    visual: {
      kind: "image",
      src: "/projects/rabmate/dashboard.jpg",
      alt: l("Dashboard RABmate AI berisi ringkasan proyek dan RAB", "RABmate AI dashboard with project and estimate summaries"),
      width: 800,
      height: 513,
    },
  },
  {
    slug: "koperasi-pos",
    title: l("Koperasi POS", "Koperasi POS"),
    kicker: l("Magang, PT. Sinar Mulia Plasindo Lestari", "Internship, PT. Sinar Mulia Plasindo Lestari"),
    year: "2025",
    tracks: ["software"],
    summary: l(
      "Satu sistem untuk kasir, gudang, dan keuangan koperasi. Dibangun bersama tim selama magang tiga bulan, dipakai oleh pengurus, kasir, dan anggota dengan wewenang yang berbeda.",
      "One system for the till, the stockroom, and a cooperative's finances. Built with a team during a three-month internship, used by managers, cashiers, and members with different permissions.",
    ),
    points: [
      l(
        "Kasir dengan shift per lokasi, bayar tunai atau lewat wallet anggota, dan pintasan keyboard F1–F9.",
        "A point of sale with per-location shifts, cash or member-wallet payment, and F1–F9 keyboard shortcuts.",
      ),
      l(
        "Modul inventori lengkap: produk, satuan, lokasi, stok, pergerakan stok, dan penerimaan barang (GRN).",
        "A full inventory module: products, units, locations, stock, stock movements, and goods received notes (GRN).",
      ),
      l(
        "Simpanan, pinjaman, angsuran, dan pencairan tunai, ditambah portal anggota untuk riwayat keuangan pribadi.",
        "Savings, loans, installments, and cash withdrawals, plus a member portal for personal financial history.",
      ),
      l(
        "Akses berbasis peran dengan Spatie Permission untuk pengurus, kasir, dan anggota.",
        "Role-based access with Spatie Permission for managers, cashiers, and members.",
      ),
    ],
    stack: ["Laravel 11", "Livewire 3", "PostgreSQL", "Tailwind CSS", "Spatie Permission", "Bavix Wallet"],
    repos: [{ label: "koperasi-pos", href: gh("koperasi-pos") }],
    visual: {
      kind: "image",
      src: "/projects/koperasi/pos-kasir.png",
      alt: l("Layar kasir Koperasi POS dengan keranjang belanja", "Koperasi POS cashier screen with a cart"),
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "skin-lesion",
    title: l("Klasifikasi Lesi Kanker Kulit", "Skin Lesion Classification"),
    kicker: l("Penelitian", "Research"),
    year: "2024",
    tracks: ["ai"],
    summary: l(
      "Pipeline klasik computer vision untuk membedakan lesi jinak dan ganas dari 10.605 citra, tanpa deep learning, supaya setiap fitur bisa dijelaskan.",
      "A classic computer vision pipeline that separates benign from malignant lesions across 10,605 images, without deep learning, so every feature can be explained.",
    ),
    points: [
      l(
        "Segmentasi lesi dengan K-Means dan pembersihan mask lewat operasi morfologi.",
        "Lesion segmentation with K-Means and mask cleanup through morphological operations.",
      ),
      l(
        "Fitur tekstur GLCM (contrast, correlation, energy, homogeneity) dan fitur bentuk (area, perimeter).",
        "GLCM texture features (contrast, correlation, energy, homogeneity) and shape features (area, perimeter).",
      ),
      l(
        "Membandingkan tiga kernel SVM, lalu tuning GridSearchCV 10-fold: RBF (C=100, gamma=1) naik dari 81,2% menjadi 83,0% pada 1.000 citra uji.",
        "Compared three SVM kernels, then tuned with 10-fold GridSearchCV: RBF (C=100, gamma=1) went from 81.2% to 83.0% on 1,000 test images.",
      ),
    ],
    stack: ["Python", "OpenCV", "scikit-image", "scikit-learn", "Jupyter"],
    facts: [
      { value: l("10.605", "10,605"), label: l("citra dataset", "dataset images") },
      { value: l("83,0%", "83.0%"), label: l("akurasi akhir", "final accuracy") },
    ],
    repos: [{ label: "skin-cancer-classification", href: gh("skin-cancer-classification") }],
    visual: { kind: "svm" },
  },
  {
    slug: "monday-notch",
    title: l("Monday Notch", "Monday Notch"),
    kicker: l("Aplikasi desktop", "Desktop app"),
    year: "2026",
    tracks: ["software"],
    summary: l(
      "Notch kecil di atas layar Windows. Musik dengan lirik tersinkron, kontrol cepat, timer fokus, to-do, dan catatan, semuanya satu hover jauhnya.",
      "A small notch at the top of a Windows screen. Music with synced lyrics, quick controls, a focus timer, to-dos, and notes, all one hover away.",
    ),
    points: [
      l(
        "Tiga slot widget di notch tertutup: baterai, jam, cuaca, ping, FPS, atau to-do.",
        "Three widget slots on the closed notch: battery, clock, weather, ping, FPS, or to-do.",
      ),
      l(
        "Enam halaman, dari Control Center sampai timer fokus dan catatan cepat.",
        "Six pages, from a Control Center to a focus timer and quick notes.",
      ),
      l(
        "Satu file .exe tanpa instalasi, runtime .NET sudah dibundel.",
        "A single .exe with nothing to install, the .NET runtime is bundled.",
      ),
    ],
    stack: ["C#", ".NET 8", "Windows 10 / 11"],
    repos: [{ label: "monday-notch", href: gh("monday-notch") }],
    visual: {
      kind: "image",
      src: "/projects/notch/control-center.png",
      alt: l("Monday Notch terbuka di halaman Control Center", "Monday Notch open on the Control Center page"),
      width: 1012,
      height: 536,
      tone: "dark",
    },
  },
  {
    slug: "discord-lyrics",
    title: l("Discord Lyrics Spotify", "Discord Lyrics Spotify"),
    kicker: l("Proyek sampingan", "Side project"),
    year: "2026",
    tracks: ["software"],
    summary: l(
      "Baris lirik lagu yang sedang diputar di Spotify muncul sebagai status Discord, bergerak mengikuti lagu. Tanpa API key Spotify dan tanpa Premium.",
      "The lyric line of whatever is playing in Spotify shows up as a Discord status and moves with the song. No Spotify API key and no Premium needed.",
    ),
    points: [
      l(
        "Membaca pemutaran dari Windows media controls, lalu mencocokkan lirik dari LRCLIB.",
        "Reads playback from Windows media controls, then matches lyrics from LRCLIB.",
      ),
      l(
        "Halaman setup lokal di browser untuk validasi dan penyimpanan token di mesin pengguna.",
        "A local setup page in the browser validates the token and stores it on the user's machine.",
      ),
    ],
    stack: ["Node.js", "JavaScript", "LRCLIB", "Windows Media API"],
    repos: [{ label: "discord-lyrics-spotify", href: gh("discord-lyrics-spotify") }],
    visual: { kind: "lyrics" },
  },
];

const experienceSource = [
  {
    role: l("Fullstack Web Developer Intern", "Fullstack Web Developer Intern"),
    org: "PT. Sinar Mulia Plasindo Lestari",
    period: "2025",
    note: l("3 bulan", "3 months"),
    body: l(
      "Membangun aplikasi Koperasi POS bersama tim: modul inventori, simpanan dan pinjaman, portal anggota, serta akses berbasis peran.",
      "Built the Koperasi POS app with a team: inventory, savings and loans, the member portal, and role-based access.",
    ),
  },
  {
    role: l("Mechanical Design Engineer & Staf Akuntansi", "Mechanical Design Engineer & Accounting Staff"),
    org: "CV. Bata Api Teknik",
    period: "2022–2025",
    note: l("sambil kuliah", "while studying"),
    body: l(
      "Merancang komponen teknis di Autodesk Inventor dan menyusun gambar kerja produksi. Mengelola pembukuan, laporan keuangan, dan Bill of Materials. Pemahaman alur stok dan uang dari sini terpakai langsung saat membangun sistem POS.",
      "Designed technical components in Autodesk Inventor and prepared production drawings. Kept the books, financial reports, and Bills of Materials. What I learned about stock and money flow here went straight into the POS system.",
    ),
  },
  {
    role: l("S1 Teknik Informatika", "B.Sc. Informatics Engineering"),
    org: "Universitas Komputer Indonesia (UNIKOM)",
    period: "2022–2026",
    note: l("IPK 3.32", "GPA 3.32"),
    body: l(
      "Skripsi tentang deteksi dan pemetaan kesiapan panen padi menggunakan citra drone berbasis edge computing dan SIG.",
      "Thesis on detecting and mapping rice harvest readiness from drone imagery, using edge computing and GIS.",
    ),
  },
];

const skillSource = [
  {
    group: l("Computer vision & ML", "Computer vision & ML"),
    items: ["OpenCV", "scikit-learn", "scikit-image", "NumPy", "K-Means & HSV segmentation", "GLCM", "SVM"],
  },
  { group: l("Geospasial", "Geospatial"), items: ["Rasterio", "GeoTIFF", "OpenDroneMap", "Leaflet"] },
  { group: l("Backend", "Backend"), items: ["FastAPI", "Laravel 11", "Pydantic", "REST API", "PostgreSQL", "MySQL"] },
  { group: l("Frontend", "Frontend"), items: ["Next.js", "React", "TypeScript", "Livewire", "Tailwind CSS"] },
  { group: l("Alat", "Tools"), items: ["Docker", "Git", "GitHub", "VS Code", "Autodesk Inventor"] },
];

const ui = {
  id: {
    metaDescription:
      "Software engineer dari Bandung yang juga mengerjakan computer vision. Aplikasi web fullstack dan sistem pengolahan citra.",
    skip: "Lewati ke konten",
    nav: { home: "Beranda", work: "Karya", experience: "Pengalaman", about: "Tentang", contact: "Kontak" },
    navLabel: "Navigasi utama",
    clock: "Waktu lokal Bandung",
    langLabel: "Bahasa",
    themeToLight: "Ganti ke tema terang",
    themeToDark: "Ganti ke tema gelap",
    hero: {
      name: "Ryan M Hildan.",
      role: ["Software engineer yang juga", "mengerjakan ", "computer vision", "."],
      intro:
        "Nama lengkap saya Ryan Muhammad Hildan, lulusan Teknik Informatika UNIKOM. Saya membangun aplikasi web fullstack dengan Laravel dan Next.js, dan sistem pengolahan citra dengan OpenCV dan FastAPI.",
      headline: "Ryan M Hildan.\nSoftware dan computer vision.",
      headlineAccent: "computer vision.",
      hint: "Gerakkan kursor di atas bentuk ini",
      hintTouch: "Sentuh bentuk ini",
      sculptureAlt: "Patung abstrak dari serat logam yang saling menjalin",
      videoPause: "Jeda video latar",
      videoPlay: "Putar video latar",
      ctaEmail: "Kirim email",
      ctaWork: "Lihat proyek",
      now: "Saat ini",
      status: "Status",
      statusValue: "Terbuka untuk posisi penuh waktu",
      based: "Domisili",
      basedValue: "Bandung, Indonesia",
      localTime: "Waktu lokal",
      stack: "Sehari-hari",
      stackValue: "Laravel, Next.js, Python, OpenCV",
      links: "Tautan",
    },
    work: {
      title: "Karya",
      eyebrow: "Karya pilihan, 2024 sampai sekarang",
      filterLabel: "Saring proyek",
      filters: { all: "Semua", software: "Software", ai: "AI & Computer Vision" },
      details: "Detail proyek",
      demo: "Demo langsung",
      newTab: "(tab baru)",
      back: "Semua proyek",
      overview: "Ringkasan",
      stack: "Teknologi utama",
      gallery: "Tangkapan layar",
      links: "Tautan",
      openImage: "Buka gambar ukuran penuh",
      prev: "Proyek sebelumnya",
      next: "Proyek berikutnya",
      notFound: "Proyek tidak ditemukan.",
    },
    visuals: {
      svmCaption: "Akurasi pada 1.000 citra uji",
      svmAxis: "sumbu 70–85%",
      svmNote: "Hanya untuk pembelajaran. Hasil model bukan diagnosis medis.",
      lyricsNote: "Demo. Lirik asli muncul saat aplikasi berjalan",
      lyricsLine: "baris lirik",
    },
    experience: { title: "Pengalaman", eyebrow: "Kerja dan kuliah" },
    about: {
      eyebrow: "Latar belakang",
      lead: ["Tiga tahun saya kuliah sambil bekerja: menggambar komponen mesin, lalu ", "merapikan pembukuan", "."],
      body: [
        "Dari situ saya belajar bahwa stok, uang, dan wewenang punya aturan yang tidak boleh ditebak. Itu yang saya bawa ke setiap aplikasi: angka dihitung di server, peran dipisahkan dengan jelas, dan alurnya mengikuti cara orang benar-benar bekerja.",
        "Di sisi computer vision, saya lebih suka pipeline yang bisa dijelaskan langkah demi langkah, lalu dibawa keluar dari notebook menjadi API dan aplikasi yang bisa dipakai orang lain.",
        "Ke depan, saya ingin berkembang sebagai AI Engineer atau Data Scientist: mengolah data sampai jadi model, menguji hasilnya dengan jujur, lalu menjalankannya di sistem yang dipakai sehari-hari.",
      ],
      skills: "Yang saya pakai",
      tech: {
        title: "Teknologi yang saya pakai",
        web: "web dan backend",
        vision: "computer vision dan ML",
        also: "Juga:",
        alsoItems: "scikit-image, Rasterio, GeoTIFF, OpenDroneMap, segmentasi K-Means dan HSV, GLCM, SVM, Pydantic, REST API, dan Autodesk Inventor.",
      },
    },
    download: {
      portfolio: "Unduh portofolio",
      note: "Portofolio dalam bentuk slide PDF",
    },
    contact: {
      eyebrow: "Email, WhatsApp, atau LinkedIn",
      title: ["Punya proyek atau posisi yang cocok? ", "Kirim email."],
      copy: "Salin email",
      copied: "Tersalin",
      copiedLive: "Email tersalin ke clipboard",
      phone: "Telepon / WhatsApp",
      footer: "Dibuat dengan Next.js",
    },
  },
  en: {
    metaDescription:
      "Software engineer from Bandung who also works in computer vision. Fullstack web apps and image processing systems.",
    skip: "Skip to content",
    nav: { home: "Home", work: "Work", experience: "Experience", about: "About", contact: "Contact" },
    navLabel: "Main navigation",
    clock: "Local time in Bandung",
    langLabel: "Language",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    hero: {
      name: "Ryan M Hildan.",
      role: ["A software engineer who", "also works in ", "computer vision", "."],
      intro:
        "My full name is Ryan Muhammad Hildan, an Informatics Engineering graduate from UNIKOM. I build fullstack web apps with Laravel and Next.js, and image processing systems with OpenCV and FastAPI.",
      headline: "Ryan M Hildan.\nSoftware and computer vision.",
      headlineAccent: "computer vision.",
      hint: "Move your cursor across the form",
      hintTouch: "Touch the form",
      sculptureAlt: "Abstract sculpture of interwoven metallic filaments",
      videoPause: "Pause background video",
      videoPlay: "Play background video",
      ctaEmail: "Send an email",
      ctaWork: "See the projects",
      now: "Right now",
      status: "Status",
      statusValue: "Open to full-time roles",
      based: "Based in",
      basedValue: "Bandung, Indonesia",
      localTime: "Local time",
      stack: "Day to day",
      stackValue: "Laravel, Next.js, Python, OpenCV",
      links: "Links",
    },
    work: {
      title: "Work",
      eyebrow: "Selected work, 2024 to now",
      filterLabel: "Filter projects",
      filters: { all: "All", software: "Software", ai: "AI & Computer Vision" },
      details: "Project details",
      demo: "Live demo",
      newTab: "(new tab)",
      back: "All projects",
      overview: "Overview",
      stack: "Main stack",
      gallery: "Screenshots",
      links: "Links",
      openImage: "Open full-size image",
      prev: "Previous project",
      next: "Next project",
      notFound: "Project not found.",
    },
    visuals: {
      svmCaption: "Accuracy on 1,000 test images",
      svmAxis: "axis 70–85%",
      svmNote: "For learning only. Model output is not a medical diagnosis.",
      lyricsNote: "Demo. Real lyrics show up when the app runs",
      lyricsLine: "lyric line",
    },
    experience: { title: "Experience", eyebrow: "Work and study" },
    about: {
      eyebrow: "Background",
      lead: ["For three years I studied while working: drawing machine parts, then ", "keeping the books", "."],
      body: [
        "That taught me stock, money, and permissions follow rules you cannot guess at. I bring that into every app: numbers are computed on the server, roles are kept clearly apart, and the flow follows how people actually work.",
        "On the computer vision side, I prefer pipelines that can be explained step by step, then taken out of the notebook and turned into APIs and apps other people can use.",
        "Next, I want to grow as an AI Engineer or Data Scientist: taking data all the way to a model, testing the results honestly, then running it inside systems people use every day.",
      ],
      skills: "What I use",
      tech: {
        title: "The stack I work with",
        web: "web and backend",
        vision: "computer vision and ML",
        also: "Also:",
        alsoItems: "scikit-image, Rasterio, GeoTIFF, OpenDroneMap, K-Means and HSV segmentation, GLCM, SVM, Pydantic, REST APIs, and Autodesk Inventor.",
      },
    },
    download: {
      portfolio: "Download portfolio",
      note: "The portfolio as PDF slides",
    },
    contact: {
      eyebrow: "Email, WhatsApp, or LinkedIn",
      title: ["Have a project or a role that fits? ", "Send an email."],
      copy: "Copy email",
      copied: "Copied",
      copiedLive: "Email copied to clipboard",
      phone: "Phone / WhatsApp",
      footer: "Built with Next.js",
    },
  },
};

export type Dict = (typeof ui)["id"];

export function getContent(lang: Lang) {
  const pick = (x: { id: string; en: string }) => x[lang];
  const projects = projectSource.map((p) => ({
    ...p,
    title: p.title[lang],
    kicker: p.kicker[lang],
    summary: p.summary[lang],
    points: p.points.map((x) => x[lang]),
    facts: p.facts?.map((f) => ({ value: typeof f.value === "string" ? f.value : f.value[lang], label: f.label[lang] })),
    visual:
      p.visual.kind === "image"
        ? { ...p.visual, alt: p.visual.alt[lang], extras: p.visual.extras?.map((x) => ({ ...x, alt: x.alt[lang] })) }
        : p.visual,
    detail: resolveDetail(details[p.slug], pick),
  }));
  const experience = experienceSource.map((e) => ({
    ...e,
    role: e.role[lang],
    note: e.note[lang],
    body: e.body[lang],
  }));
  const skills = skillSource.map((s) => ({ group: s.group[lang], items: s.items }));
  return { dict: ui[lang] as Dict, projects, experience, skills };
}

export type Project = ReturnType<typeof getContent>["projects"][number];

function resolveDetail(d: DetailSource | undefined, pick: (x: L) => string) {
  if (!d) return null;
  return {
    overview: d.overview.map(pick),
    sections: d.sections.map((sec) => ({ title: pick(sec.title), items: sec.items.map(pick) })),
    gallery: (d.gallery ?? []).map((g) => ({ ...g, alt: pick(g.alt), caption: pick(g.caption) })),
    links: (d.links ?? []).map((x) => ({ label: pick(x.label), href: x.href })),
    note: d.note ? pick(d.note) : null,
  };
}
