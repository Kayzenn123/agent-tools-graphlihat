# CRITIQUE — GraphLihat — 2026-10-25

## Slop test (v3) + 3 hal paling template + yang dirombak
- **Slop test:** tutup logo "GraphLihat" — halaman tetap ketahuan: judul Blaka raksasa yang miring, dua band marquee (merah + biru), kertas koran #f1ceca, dan meja graf hidup. Tidak ketukar dengan build lain. **LOLOS.**
- **3 hal paling template:**
  1. Grid Features 6 kartu (widget standar AstroWind).
  2. Accordion FAQ standar.
  3. Header/footer chrome template (navigasi + logo).
- **Yang dirombak (2 dari 3, putaran 1):**
  1. Hero bukan widget Hero (hero tengah + badge + 2 tombol + gambar) — diganti judul Blaka raksasa 17vw sebagai pintu, tanpa gambar hero sama sekali.
  2. Announcement bar template (badge shields.io eksternal + tautan astro.build) — diganti bar milik sendiri, tanpa fetch eksternal.
  3. Features/FAQ dipertahankan sebagai widget, tapi isinya 100% copy Mbak Arsip + fakta nyata (bukan lorem/fitur generik) — diterima sebagai "disiplin di sekeliling satu momen berani" (frontend-design).
- **Keputusan berani & signature moment dalam 5 detik pertama?** Judul raksasa + marquee + "Tempel catatanmu" terlihat langsung. Zoom-through judul jadi pintu (clip-path lingkaran) **tidak jadi diimplementasi** — lihat "Dipangkas". Yang tersisa: zoom scrub judul 1.35× + rotate saat scroll. Momen "masuk ke meja" tetap terasa, tapi kurang teatrikal dari storyboard. **Diterima dengan catatan.**

## Gerbang gerak (v4): jumlah lapisan, zoom, pan, 2 marquee, FPS 4x
- Lapisan gerak: **4 kategori** — A kamera (zoom scrub hero + rotate), B marquee 2 band berlawanan + skew velocity, C teks (Heebo wght 400→800 saat scroll), E reveal (curtain wipe 3 section). D input (drag inertia canvas + hover simpul). F tidak dipakai (sengaja).
- Zoom: ya (hero scale 1.35 scrub). Pan horizontal: ya (canvas graf bisa diseret + keyboard panah). 2 marquee: ya (arah berlawanan, kecepatan beda, skew ikut velocity).
- **Split flip 3D judul hero (rencana BRIEF) tidak diimplementasi** — diganti wght animation (v5 ATURAN 6: ganti animasi diizinkan). Dicatat, bukan disembunyikan.
- FPS 4x CPU throttle (qa.js, chromium): **57.1** (run terakhir; 50.8–52.1 di run sebelumnya). Target ≥45. **LOLOS.**
- Reduced-motion: 0 animasi berjalan (qa.js). Toggle "Gerak: nyala/mati" ada + menghormati preferensi OS. **LOLOS.**
- Font/palet/gaya ikon beda dari 7 build terakhir? Ya — Blaka/Heebo/Bilbo (baru), mid→light split-complementary hue 21 (kombinasi baru), monoline (terakhir 2026-10-11, 14 build lalu). Kontras AA terhitung semua lolos (lihat BRIEF). Body terbaca di 390px (Heebo 16px, diuji). **LOLOS.**

## Gerbang v5: tes bandingkan, blur, 3 detik, keyboard-only, reduced-motion, mode ringan
- **Tes bandingkan** (vs screenshot 2026-10-22 DeadlineRadar, 2026-10-23 TimLomba/WartegKaset): palet kertas merah-muda + Blaka + spreadsheet tidak sekeluarga dengan ketiganya. **LOLOS.**
- **Tes blur:** komposisi masih punya identitas — blok judul raksasa + dua band marquee + kotak graf besar. **LOLOS.**
- **Tes 3 detik:** orang asing paham ini "alat ubah catatan jadi graf" dari judul + subjudul + tombol "Buka Meja Kerja". **LOLOS.**
- **Tes keyboard-only:** sebagian terverifikasi — Tab mencapai semua kontrol; canvas graf merespons panah/+/−/F/Esc (diuji); tombol "Lihat" di tabel memilih simpul. **Belum penuh:** walkthrough keyboard menyeluruh (header dropdown, semua widget) belum dijalankan — dicatat sebagai [BELUM TERVERIFIKASI PENUH].
- **Tes reduced-motion:** lolos (0 animasi berjalan). **LOLOS.**
- **Tes MODE RINGAN:** belum diuji dengan hardwareConcurrency ≤ 4 secara eksplisit (logika mode ringan ada di kode: matikan zoom/marquee velocity saat gerak mati; deteksi Save-Data/deviceMemory belum diuji di perangkat nyata). **[BELUM TERVERIFIKASI]** — dicatat jujur.

## Budget performa + Lighthouse (mobile/desktop)
- JS total gzip: **~197 KB** (GraphTool 146.7 KB incl. Cytoscape+GSAP, index 44.5 KB, router/prefetch ~6 KB) — batas 250 KB. **LOLOS.**
- CSS gzip: **19.7 KB** (batas 60 KB). Font total: **62 KB** (3 woff2). Gambar di atas fold: OG 66 KB. **LOLOS.**
- Lighthouse (chrome-headless-shell, CHROME_PATH eksplisit — percobaan pertama gagal karena CHROME_PATH menunjuk binary chromium yang tidak ada): **mobile 98/100/100/100** (LCP 1.8 dtk, CLS 0, TBT 130 mdtk), **desktop 100/100/100/100** (LCP 0.6 dtk, TBT 40 mdtk). Perjalanan: 61 → 86 (lazy Cytoscape + hapus opacity scrub) → 98 (lazy GSAP). Sisa gap mobile adalah plafon CPU VM, bukan cacat halaman.
- qa.js: **exit 0** lokal (4 viewport, 0 overflow, 0 console issue, 0 tap-target kecil, 0 input tanpa label, h1=1, lang=id). fps4x 57.1.

## Keamanan + lisensi
- Tidak ada innerHTML dengan data pengguna (detail panel + tabel dibangun via textContent/DOM). URL params & localStorage divalidasi (validateGraph, batas 200 simpul/400 relasi, try/catch). Tidak ada API key, tracker, atau analytics. Tautan eksternal pakai rel noopener (bawaan template).
- Lisensi: font Blaka/Heebo/Bilbo (OFL via Google Fonts/Fontsource), ikon Tabler (MIT) + 4 SVG custom, Cytoscape.js (MIT), GSAP 3.15 (lisensi gratis Webflow, bukan MIT — dicatat), AstroWind (MIT). Kredit di README.
- Fakta: 3 contoh berisi fakta umum (resep generik, IPA dasar, sejarah mapan 1293/1336/1350–1389). Tidak ada testimoni/harga/statistik karangan. **LOLOS.**

## Skor 1-10: karakter, keunikan, kerapian
- **Karakter: 9** — suara Mbak Arsip konsisten sampai pesan error; Blaka + marquee + stempel; palet kertas koran khas.
- **Keunikan: 8** — spreadsheet-sebagai-UI + graf bukti adalah kombinasi yang belum ada di 16 build sebelumnya; dikurangi 2 poin karena Features/FAQ memakai widget standar.
- **Kerapian: 8** — graf render bersih di 390/1280px; dikurangi karena label edge 10px sulit dibaca tanpa zoom dan label "Bawang merah/putih" sedikit berdesakan di desktop.

## Keputusan konflik aturan (kalau ada) + daftar dipangkas
- **Konflik 1:** frontend-design melarang "layout koran + bg krem + aksen terracotta" sebagai pola default AI — seed memerintahkan referensi koran kuning + hue 21. Keputusan: pakai yang lebih ketat (frontend-design) untuk layout (bukan koran multi-kolom; layout = spreadsheet + graf), dan seed untuk warna/nuansa (kertas hangat #f1ceca, bukan krem pucat #F4F1EA; aksen utama teal/biru, bukan terracotta). Dicatat di BRIEF.
- **Konflik 2:** seed domain "resep nenek" vs ide GraphLihat — fusi: contoh utama = graf resep Rendang Nenek; tool tetap umum.
- **Dipangkas:** (1) zoom-through clip-path lingkaran judul→meja (waktu; diganti scale scrub); (2) split flip 3D judul hero (diganti wght animation); (3) lapisan F shader/3D; (4) suara; (5) halaman demo template (homes/landing/services/pricing/about/contact); (6) RSS feed (blog mati → rss.xml 404; showRssFeed dicabut).
- **Re-seed 1×** (ATURAN 19 v5): seed pertama tabrakan 100% dengan build pasar loak 2026-10-18 di LOG.md — pick-seed lolos karena builds/2026-10-18 tak punya seed.json. Pelajaran: cek LOG.md manual selalu.

## Putaran rombak ke-1 dan ke-2
- **Putaran 1 (fungsional/QA):** base path salah (site berisi path repo + base berslash → homepage jadi redirect stub) → perbaiki ikut skill deploy-with-base-path. Overflow mobile 440px (sr-only di dalam tabel lebar) → wrapper relative + aria-label. 52 tap-target kecil → 0 (min-height 44px + CSS global header/footer). RSS 404 → cabut showRssFeed. Announcement eksternal → bar sendiri. Deep-link ?g= tanpa slash → 404 di astro preview → normalisasi withSlash().
- **Putaran 2 (visual):** tracking-tighter Blaka membuat judul widget bertabrakan → override tracking-normal/leading-tight di semua Headline. Footer contoh link `/#meja?contoh=` (query di fragment, tidak terbaca) → `/?contoh=#meja`.
- **Tidak ada putaran 3** — skor sudah ≥8 semua; sisa kekurangan dicatat jujur di atas, bukan disembunyikan.
