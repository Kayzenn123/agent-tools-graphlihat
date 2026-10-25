# GraphLihat — Ubah Catatan Jadi Peta Graf

Tempel catatanmu, lihat hubungan antar idenya sebagai graf interaktif — dan klik tiap garisnya untuk membaca kalimat buktinya. Gratis, tanpa akun, datamu tidak keluar dari browser.

**Live:** https://kayzenn123.github.io/agent-tools-graphlihat

## Fitur

- **Tempel catatan → graf langsung jadi.** Ekstraksi kata kunci berbasis frekuensi berjalan lokal di browser (bukan AI): kata yang muncul berulang jadi simpul, dua simpul dalam satu kalimat jadi relasi.
- **Tiap relasi punya kalimat bukti.** Klik simpul atau garis untuk melihat kalimat persis dari catatanmu, plus daftar tetangganya.
- **Fokus tetangga.** Nyalakan "Hanya tetangga" untuk melihat cuma simpul pilihanmu + tetangga satu level — graf besar tidak jadi bola rambut.
- **Buku besar spreadsheet.** Semua simpul & relasi dibedah di tabel: cari, saring, hapus, tambah simpul/relasi manual beserta kalimat bukti.
- **3 contoh bawaan.** Rendang Nenek (18 simpul), Fotosintesis (18), Majapahit (18) — fakta umum yang ditulis tangan.
- **Simpan & bagikan.** Tersimpan otomatis di localStorage; ekspor JSON & PNG; salin tautan deep-link (`?g=` / `?contoh=`).
- **Easter egg.** Ketuk stempel "TERVERIFIKASI" 5 kali.

## Teknologi

Astro 7 + Tailwind CSS v4 (template AstroWind) · Cytoscape.js 3.34 (mesin graf) · GSAP 3.15 + ScrollTrigger (gerak) · Astro Fonts API (Blaka / Heebo variable / Bilbo) · localStorage + URL params (tanpa backend).

## Cara menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Skor QA

- `tools/qa.js`: **exit 0** (4 viewport: 360/390/768/1280 — 0 overflow, 0 console issue, 0 tap-target < 44px, 0 input tanpa label)
- FPS CPU throttle 4x: **57.1** (target ≥ 45)
- Reduced-motion: 0 animasi berjalan; ada toggle "Gerak: nyala/mati"
- Lighthouse: **mobile 98/100/100/100, desktop 100/100/100/100** (LCP mobile 1.8 dtk, CLS 0)
- Budget: JS gzip ~197 KB (batas 250 KB), CSS gzip 19.7 KB, font 62 KB

## Struktur

- `src/lib/graph.ts` — model data, 3 contoh bawaan, ekstraksi kata kunci, encode/decode deep-link
- `src/components/GraphTool.astro` — meja kerja: canvas Cytoscape, panel bukti, tabel spreadsheet, impor/ekspor
- `src/pages/index.astro` — hero + marquee + widget (Features/Steps/FAQs)
- `BRIEF.md` / `CRITIQUE.md` / `seed.json` — konsep, penilaian jujur, dan konstrain seed hari ini

## Kredit & lisensi

- Font Blaka, Heebo, Bilbo — SIL Open Font License (Google Fonts / Fontsource)
- Ikon Tabler — MIT; 4 ikon SVG custom digambar sendiri
- Cytoscape.js — MIT · GSAP — lisensi gratis Webflow · Template AstroWind — MIT
- Dibangun 2026-10-25 sebagai build harian j0800 (repo `agent-tools-graphlihat`).
