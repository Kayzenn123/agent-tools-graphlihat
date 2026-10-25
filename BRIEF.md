# BRIEF — GraphLihat — 2026-10-25

## Masalah/usecase (1 kalimat + siapa yang kena)
Pelajar yang baca catatan panjang tidak bisa melihat hubungan antar ide — GraphLihat mengubah teks/catatan mereka jadi peta graf interaktif yang tiap garisnya bisa diklik untuk melihat kalimat buktinya.

## Konsep visual (1 kalimat)
Satu meja arsip koran kuning: graf pengetahuan hidup di atas kertas, datanya dibedah di tabel spreadsheet di bawahnya.

## Hasil seed (seed.json, base 2026-11-15, buildDate 2026-10-25)
- Domain: resep nenek · Layout: spreadsheet sebagai UI · Referensi: koran kuning
- Constraint: grain/noise wajib
- Motion: kamera "terbang" (scale+translate+rotate) · marquee 2 band berlawanan + skew velocity · variable font axis · drag inertia flick · curtain wipe
- Ikon: monoline satu garis menyambung, sumber Streamline (dipakai via Tabler di astro-icon, gaya sama: outline 1 garis)
- Font: Blaka (display) / Heebo variable (body) / Bilbo (aksen tulisan tangan)
- Palet: mode mid → dirapikan ke light (lihat bawah), harmoni split-complementary, hue dasar 21
- Catatan seed: re-seed sekali sebelum kode (ATURAN 19 v5). Seed pertama 2026-11-02 (pasar loak / papan pengumuman / Eagle Lake / light split-comp hue 285) tabrakan 100% dengan build pasar loak 2026-10-18 di LOG.md — pick-seed lolos karena builds/2026-10-18 tidak punya seed.json. Cek LOG.md manual wajib lain kali.

## Fusi ide × seed
Ide GraphLihat (knowledge graph) + domain resep nenek: contoh utama = graf resep "Rendang Nenek" (18 node) — resep adalah graf yang semua orang paham (bahan → langkah → hasil), jadi alat abstrak langsung kebaca. Dua contoh lain: Fotosintesis (pelajar IPA) dan Majapahit (pelajar sejarah). Tool tetap umum: pengguna bisa tempel catatan apa pun dan graf dibangun lokal di browser.

## 3 arah desain (2 kalimat masing-masing) + arah terpilih
1. **Meja arsip koran kuning.** Kertas hangat, stempel, tabel spreadsheet. Graf di tengah seperti peta dinding di kantor redaksi koran. Hangat tapi berisiko mirip "koran" generik.
2. **Papan tulis forensik (benang merah).** Node = kartu foto, edge = benang merah, seperti dinding investigasi detektif. Dramatis, tapi gelap dan mengancam untuk pelajar.
3. **Atlas / peta transit pengetahuan.** Node = stasiun, edge = jalur kereta, tiap klik = "turun di stasiun" dan baca buktinya. Sistematis dan segar, tapi butuh banyak ikon peta.
- **Terpilih: arah 1**, karena paling jauh dari default SaaS dan paling nyambung dengan seed (koran kuning + spreadsheet + grain), dengan satu elemen arah 3: edge graf diperlakukan seperti jalur transit (label relasi di tengah garis).

## Keputusan berani
Tidak ada hero headline. Pengunjung langsung dihadapkan pada graf hidup berukuran penuh di 5 detik pertama — judul "GRAPHLIHAT" raksasa (Blaka) adalah pintu zoom-through ke meja kerja; scroll = terbang masuk ke dalam graf. Tidak ada navbar marketing, tidak ada "hero + 3 kartu fitur".

## Persona/suara
**Mbak Arsip, pustakawan koran yang teliti.** Bicara singkat, hangat, pakai "kamu". Error: "Halaman ini kosong, Mbak belum nemu simpul apa pun — tempel catatanmu dulu, ya." Empty state: "Meja masih kosong. Tempel catatan, atau buka contoh Rendang Nenek." Footer: "Dibuat di meja arsip, bukan di awan — datamu tidak pernah keluar dari browser ini."

## Palet (harmoni, kenapa, psikologi warna, token final, hasil cek kontras AA)
- Harmoni split-complementary hue 21 (terakota) vs 171 (teal) vs 240 (biru). Psikologi: kertas hangat = arsip & nostalgia; tinta terakota = stempel & urgensi; teal/biru = jalur bukti yang dingin dan bisa dipercaya.
- Seed mentah (bg oklch 0.74/0.12/21) DIUBAH: render jadi #ed8b8a salmon menyala + kontras aksen cuma 1.32:1 (gagal AA). Per v4 ATURAN 3: hue dipertahankan, lightness/chroma dirapikan.
- Token final (oklch → hex, dihitung, bukan feeling):
  - --bg: oklch(0.88 0.040 25) #f1ceca · --surface: oklch(0.94 0.025 25) #fce5e3 · --surface2: oklch(0.84 0.050 25) #eabfba
  - --text: oklch(0.17 0.030 21) #1b0a0a · --muted: oklch(0.38 0.030 21) #513c3b
  - --accent (terra-ink): oklch(0.38 0.150 21) #7f041c · --accent-display: oklch(0.52 0.160 21) #b2363f (teks besar saja)
  - --accent-2 (teal-ink): oklch(0.38 0.130 171) #005639 · --accent2-ink biru: oklch(0.40 0.150 240) #004c8f
  - --pop (grafik saja): oklch(0.72 0.190 200) #00c5d3
- Cek kontras (teks biasa ≥ 4.5:1, teks besar ≥ 3:1): text/bg 13.21 · muted/bg 6.98 · terra-ink/bg 7.42 · teal-ink/bg 6.01 · blue-ink/bg 5.93 · terra-display/bg 4.11 (besar saja) · text/pop 9.07. SEMUA LOLOS.

## Font (display/body/aksen, alasan, id Fontsource, variable atau bukan)
- Display **Blaka** (fontsource/blaka, NOT variable, 400 only) — huruf display berongga ala judul koran lama; dipakai untuk judul raksasa & angka.
- Body **Heebo** (fontsource/heebo, VARIABLE wght 100–900, latin) — satu-satunya font variable → animasi variable-axis (wght 400→800 saat scroll) hanya di Heebo, sesuai ATURAN 6 v5. Paragraf 3 baris terbaca di 390px.
- Aksen **Bilbo** (fontsource/bilbo, handwriting, 400) — catatan tangan Mbak Arsip (label stempel, coretan).
- Skala: judul hero clamp(64px, 18vw, 220px); body 16–18px; tabel 14px (min, dengan scroll horizontal di mobile).

## Ikon (gaya, sumber, daftar 12+ ikon, 3+ custom)
- Gaya: monoline — satu garis menyambung, stroke 1.5–2px, sudut membulat. Sumber: Tabler via astro-icon (gaya setara Streamline monoline).
- Daftar (12+): share-2 / network (graf), zoom-in, zoom-out, maximize (fit), refresh (layout ulang), search, filter, download, link/copy, file-plus (tambah catatan), trash, eye / eye-off (fokus tetangga), x, plus, arrow-left, printer.
- Custom SVG (3+, digambar sendiri): (1) simpul-benang (node + edge melengkung), (2) panci rendang mini (stempel contoh), (3) kaca pembesar di atas jalur (ikon "jalur bukti"), (4) stempel bundar "TERVERIFIKASI — MBak Arsip".
- Dekoratif: grain via feTurbulence (constraint wajib), divider garis gerigi (sobekan kertas), stempel bundar berputar lambat.

## Gerak (kategori A-F, narasi, MODE RINGAN)
- Narasi: scroll = terbang masuk ke peta arsip. Marquee = suara mesin cetak koran. Kursor = senter arsip.
- A kamera: GSAP ScrollTrigger scrub — hero Blaka raksasa scale 1→1.6 + rotate -2° lalu zoom-through (clip-path lingkaran) ke meja graf; section graf pinned sebentar.
- B marquee: 2 band berlawanan (atas: nama simpul contoh; bawah: "JALUR BUKTI • SIMPUL • RELASI •") + skew mengikuti velocity scroll; tombol jeda (WCAG 2.2.2).
- C teks: Heebo wght 400→800 pada heading section saat scroll (variable axis); judul hero split per huruf flip 3D saat load.
- D input: drag inertia/flick pada strip contoh + pan graf (Cytoscape drag + inertia); hover simpul → seluruh halaman sedikit berubah (aksen teal naik) — hemat, hanya di graf.
- E reveal: curtain wipe antar section (clip-path inset), draw-on garis sumbu spreadsheet.
- F: TIDAK dipakai (dipotong duluan sesuai ATURAN 2 v5).
- MODE RINGAN (hardwareConcurrency ≤ 4 / deviceMemory ≤ 4 / Save-Data / FPS < 40 2 detik): matikan A-zoom & marquee velocity, sederhanakan D, tampilkan graf statis dengan layout jadi.

## Storyboard hero moment
| Scroll | Yang terlihat | Kamera (zoom/pan) | Marquee | Teks | Interaksi |
|---|---|---|---|---|---|
| 0% | GRAPHLIHAT raksasa (Blaka) + stempel "MEJA ARSIP" + graf mini di belakang | scale 1, rotate 0 | band atas jalan pelan | judul flip 3D per huruf | klik judul = lompat ke meja |
| 25% | Judul membesar, graf membesar dari tengah | zoom 1.4×, rotate -1° | band bawah muncul, skew naik | wght Heebo menebal | scroll = terbang |
| 50% | Zoom-through: judul jadi pintu lingkaran | clip-path lingkaran membuka | kedua band berlawanan | "Masuk ke meja" (Bilbo) | — |
| 75% | Meja graf penuh: canvas + panel bukti + tabel | scale 1, pinned | band berhenti di tepi | heading "Meja Kerja" wght 800 | klik simpul → panel bukti |
| 100% | Tabel spreadsheet simpul/relasi + ekspor | — | — | — | filter, ekspor JSON/PNG, salin tautan |

- Pertunjukan utama di 25–50%: zoom-through judul jadi pintu. Yang dirasakan pengunjung di 5 detik pertama: "ini bukan landing page — ini meja kerja yang hidup."

## Konten (15+ item nyata, easter egg)
- 3 contoh bawaan (54 simpul total): Rendang Nenek (18 simpul, 20 relasi), Fotosintesis (18 simpul, 20 relasi), Majapahit (18 simpul, 19 relasi). Tiap relasi punya 1 kalimat bukti (ditulis tangan, fakta umum: resep generik, IPA textbook, sejarah mapan 1293/1336/1350–1389).
- Fitur nyata: tempel catatan → ekstraksi kata kunci lokal (tanpa server, tanpa klaim "AI"), tambah simpul/relasi manual, hapus, filter tipe, cari simpul, fokus tetangga 1 level (ala Obsidian local graph), zoom/pan/fit, layout ulang, simpan localStorage (key berversi), deep-link (?contoh= / ?g=), ekspor JSON + PNG + salin tautan, impor JSON.
- Easter egg: ketuk stempel "TERVERIFIKASI" 5× → Mbak Arsip muncul (Bilbo): "Kamu teliti juga, ya. Simpul rahasia: 'Nenek' terhubung ke semua resep."

## Teknik visual orisinal (2+)
1. Grain koran via SVG feTurbulence + pola titik halftone pada band marquee.
2. Tipografi sebagai ilustrasi: judul Blaka raksasa sebagai pintu zoom-through; stempel bundar SVG berputar.
3. Garis gerigi sobekan kertas sebagai divider antar section.

## Suara (ya/tidak, detail)
Tidak — tidak ada audio. (Fokus ke interaksi graf.)

## Referensi (riset, diverifikasi)
1. Obsidian Graph View — https://obsidian.md/ — local graph + highlight koneksi saat hover (ditiru); hindari hairball tanpa filter.
2. Kumu — https://kumu.io/ — impor dari spreadsheet From→To, klik node → panel detail (ditiru); beda: tiap edge GraphLihat menampilkan kalimat bukti.
3. Cytoscape.js — https://js.cytoscape.org/ — mesin graf (MIT, dipakai Google/GitHub/Meta/Obsidian), pan/zoom/drag/layout (dipakai sebagai library, dibungkus UI sederhana paste-teks → graf).

## Teknologi
AstroWind (Astro 7 + Tailwind v4) · Cytoscape.js 3.x (mesin graf) · GSAP + ScrollTrigger (gerak) · Astro Fonts API (Blaka/Heebo/Bilbo) · localStorage + URL params (tanpa backend; endpoint api/health.ts bawaan template tetap ada).
