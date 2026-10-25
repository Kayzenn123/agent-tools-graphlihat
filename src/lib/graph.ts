// GraphLihat — model data + ekstraksi kata kunci lokal (tanpa server, tanpa klaim AI).
// Semua pemrosesan teks berjalan di browser pengguna. Contoh bawaan berisi
// fakta umum (resep generik, IPA textbook, sejarah mapan) + label "contoh".

export type NodeType = 'topik' | 'nama' | 'tahun' | 'langkah';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  /** kalimat-kalimat tempat simpul ini muncul (maks 3 disimpan) */
  evidence: string[];
  /** frekuensi kemunculan (untuk ukuran simpul) */
  weight: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  /** kalimat bukti relasi ini */
  evidence: string;
  weight: number;
}

export interface GraphData {
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Sample {
  id: string;
  title: string;
  desc: string;
  stamp: string;
  graph: GraphData;
}

const n = (id: string, label: string, type: NodeType, evidence: string[], weight = 2): GraphNode => ({
  id,
  label,
  type,
  evidence,
  weight,
});
const e = (source: string, target: string, label: string, evidence: string, weight = 1): GraphEdge => ({
  id: `${source}__${target}`,
  source,
  target,
  label,
  evidence,
  weight,
});

// ---------------------------------------------------------------------------
// CONTOH 1 — Rendang Nenek (18 simpul, 20 relasi)
// ---------------------------------------------------------------------------
const RENDANG: Sample = {
  id: 'rendang',
  title: 'Rendang Nenek',
  desc: 'Resep rumahan: bahan, bumbu, dan langkah memasak rendang — graf yang semua orang paham.',
  stamp: 'CONTOH 01',
  graph: {
    title: 'Rendang Nenek',
    nodes: [
      n('rendang', 'Rendang', 'topik', ['Rendang adalah masakan daging berkuah santan yang dimasak lama.', 'Rendang berasal dari Minangkabau.'], 5),
      n('daging-sapi', 'Daging sapi', 'topik', ['Rendang dimasak dari daging sapi.', 'Daging sapi dipotong lalu dimasak bersama santan dan bumbu.'], 4),
      n('santan', 'Santan', 'topik', ['Santan memberi rasa gurih pada rendang.', 'Rendang dimasak bersama santan sampai mengering.'], 4),
      n('cabai-merah', 'Cabai merah', 'topik', ['Cabai merah memberi warna merah dan rasa pedas.', 'Cabai merah dihaluskan bersama bawang.'], 3),
      n('bawang-merah', 'Bawang merah', 'topik', ['Bawang merah dihaluskan bersama cabai.', 'Bawang merah adalah bumbu dasar rendang.'], 3),
      n('bawang-putih', 'Bawang putih', 'topik', ['Bawang putih dihaluskan bersama cabai dan bawang merah.'], 2),
      n('lengkuas', 'Lengkuas', 'topik', ['Lengkuas digeprek lalu dimasukkan ke dalam masakan.'], 2),
      n('serai', 'Serai', 'topik', ['Serai digeprek untuk memberi aroma.', 'Serai dan daun kunyit dimasukkan bersama santan.'], 2),
      n('daun-kunyit', 'Daun kunyit', 'topik', ['Daun kunyit memberi aroma khas pada rendang.'], 2),
      n('kunyit', 'Kunyit', 'topik', ['Kunyit memberi warna kuning pada bumbu.'], 2),
      n('jahe', 'Jahe', 'topik', ['Jahe memberi rasa hangat pada rendang.'], 2),
      n('ketumbar', 'Ketumbar', 'topik', ['Ketumbar disangrai lalu dihaluskan bersama bumbu lain.'], 2),
      n('garam', 'Garam', 'topik', ['Garam ditambahkan secukupnya untuk mengoreksi rasa.'], 2),
      n('kelapa-parut', 'Kelapa parut', 'topik', ['Kelapa parut disangrai sampai kecokelatan, lalu ditumbuk menjadi serundeng.'], 2),
      n('api-kecil', 'Api kecil', 'langkah', ['Rendang dimasak dengan api kecil selama berjam-jam.', 'Api kecil membuat santan mengering perlahan tanpa gosong.'], 3),
      n('minangkabau', 'Minangkabau', 'nama', ['Rendang berasal dari Minangkabau, Sumatera Barat.'], 2),
      n('nasi-hangat', 'Nasi hangat', 'topik', ['Rendang paling nikmat disantap dengan nasi hangat.'], 2),
      n('waktu-lama', 'Waktu lama', 'langkah', ['Rendang dimasak berjam-jam sampai bumbu meresap dan kuah mengering.'], 3),
    ],
    edges: [
      e('rendang', 'daging-sapi', 'dibuat dari', 'Rendang dimasak dari daging sapi.'),
      e('rendang', 'santan', 'dimasak dengan', 'Rendang dimasak bersama santan sampai mengering.'),
      e('rendang', 'minangkabau', 'berasal dari', 'Rendang berasal dari Minangkabau, Sumatera Barat.'),
      e('rendang', 'api-kecil', 'dimasak dengan', 'Rendang dimasak dengan api kecil selama berjam-jam.'),
      e('rendang', 'waktu-lama', 'butuh', 'Rendang dimasak berjam-jam sampai bumbu meresap.'),
      e('rendang', 'nasi-hangat', 'disantap dengan', 'Rendang paling nikmat disantap dengan nasi hangat.'),
      e('daging-sapi', 'santan', 'dimasak bersama', 'Daging sapi dimasak bersama santan dan bumbu.'),
      e('santan', 'api-kecil', 'mengering di atas', 'Api kecil membuat santan mengering perlahan tanpa gosong.'),
      e('cabai-merah', 'bawang-merah', 'dihaluskan bersama', 'Cabai merah dihaluskan bersama bawang.'),
      e('bawang-merah', 'bawang-putih', 'dihaluskan bersama', 'Bawang merah dan bawang putih dihaluskan bersama cabai.'),
      e('cabai-merah', 'kunyit', 'diulek bersama', 'Cabai merah dan kunyit dihaluskan menjadi bumbu.'),
      e('ketumbar', 'cabai-merah', 'dihaluskan bersama', 'Ketumbar disangrai lalu dihaluskan bersama bumbu lain.'),
      e('lengkuas', 'serai', 'digeprek bersama', 'Lengkuas dan serai digeprek untuk memberi aroma.'),
      e('serai', 'daun-kunyit', 'dimasukkan bersama', 'Serai dan daun kunyit dimasukkan bersama santan.'),
      e('jahe', 'lengkuas', 'memberi aroma bersama', 'Jahe dan lengkuas memberi rasa hangat dan aroma pada rendang.'),
      e('kelapa-parut', 'rendang', 'ditabur ke', 'Kelapa parut yang disangrai ditumbuk menjadi serundeng untuk rendang.'),
      e('garam', 'rendang', 'mengoreksi rasa', 'Garam ditambahkan secukupnya untuk mengoreksi rasa rendang.'),
      e('kunyit', 'santan', 'mewarnai', 'Kunyit memberi warna kuning pada santan dan bumbu.'),
      e('waktu-lama', 'api-kecil', 'butuh', 'Memasak lama hanya aman dengan api kecil.'),
      e('daun-kunyit', 'santan', 'dimasukkan ke', 'Daun kunyit dimasukkan bersama santan.'),
    ],
  },
};

// ---------------------------------------------------------------------------
// CONTOH 2 — Fotosintesis (18 simpul, 20 relasi)
// ---------------------------------------------------------------------------
const FOTOSINTESIS: Sample = {
  id: 'fotosintesis',
  title: 'Fotosintesis',
  desc: 'Materi IPA: bagaimana tumbuhan mengubah cahaya, air, dan karbon dioksida menjadi makanan.',
  stamp: 'CONTOH 02',
  graph: {
    title: 'Fotosintesis',
    nodes: [
      n('fotosintesis', 'Fotosintesis', 'topik', ['Fotosintesis adalah proses tumbuhan membuat makanan dari cahaya matahari.', 'Fotosintesis terjadi di daun yang mengandung klorofil.'], 5),
      n('daun', 'Daun', 'topik', ['Fotosintesis terjadi di daun.', 'Daun menangkap cahaya matahari dengan klorofil.'], 4),
      n('klorofil', 'Klorofil', 'topik', ['Klorofil adalah zat hijau di daun yang menangkap cahaya matahari.', 'Klorofil memberi warna hijau pada daun.'], 4),
      n('cahaya-matahari', 'Cahaya matahari', 'topik', ['Cahaya matahari adalah sumber energi fotosintesis.', 'Tanpa cahaya matahari, fotosintesis tidak berjalan.'], 4),
      n('karbon-dioksida', 'Karbon dioksida', 'topik', ['Karbon dioksida diserap dari udara lewat stomata.', 'Karbon dioksida adalah salah satu bahan fotosintesis.'], 3),
      n('air', 'Air', 'topik', ['Air diserap akar dari tanah.', 'Air adalah bahan fotosintesis bersama karbon dioksida.'], 3),
      n('oksigen', 'Oksigen', 'topik', ['Oksigen adalah hasil samping fotosintesis yang dilepas ke udara.', 'Oksigen keluar dari daun lewat stomata.'], 3),
      n('glukosa', 'Glukosa', 'topik', ['Glukosa adalah gula hasil fotosintesis.', 'Glukosa dipakai tumbuhan sebagai sumber energi dan bahan tumbuh.'], 3),
      n('stomata', 'Stomata', 'topik', ['Stomata adalah lubang kecil di daun tempat gas masuk dan keluar.', 'Karbon dioksida masuk lewat stomata, oksigen keluar lewat stomata.'], 3),
      n('kloroplas', 'Kloroplas', 'topik', ['Fotosintesis berlangsung di dalam kloroplas.', 'Kloroplas mengandung klorofil.'], 2),
      n('akar', 'Akar', 'topik', ['Akar menyerap air dari tanah.', 'Air dari akar diangkut ke daun lewat xilem.'], 2),
      n('xilem', 'Xilem', 'topik', ['Xilem mengangkut air dari akar ke daun.', 'Air dari akar diangkut ke daun lewat xilem.'], 2),
      n('floem', 'Floem', 'topik', ['Floem mengangkut glukosa hasil fotosintesis ke seluruh tumbuhan.'], 2),
      n('energi-cahaya', 'Energi cahaya', 'topik', ['Energi cahaya diubah menjadi energi kimia dalam glukosa.', 'Cahaya matahari adalah sumber energi fotosintesis.'], 2),
      n('tumbuhan', 'Tumbuhan hijau', 'topik', ['Tumbuhan hijau berfotosintesis untuk membuat makanannya sendiri.', 'Tumbuhan hijau menyimpan glukosa sebagai cadangan makanan.'], 2),
      n('siang-hari', 'Siang hari', 'langkah', ['Fotosintesis paling aktif pada siang hari saat cahaya kuat.', 'Pada malam hari fotosintesis berhenti karena tidak ada cahaya.'], 2),
      n('udara', 'Udara', 'topik', ['Karbon dioksida diserap dari udara.', 'Oksigen hasil fotosintesis dilepas ke udara.'], 2),
      n('gula', 'Gula', 'topik', ['Glukosa adalah gula hasil fotosintesis.', 'Kelebihan glukosa disimpan tumbuhan sebagai pati.'], 2),
    ],
    edges: [
      e('fotosintesis', 'daun', 'terjadi di', 'Fotosintesis terjadi di daun.'),
      e('fotosintesis', 'cahaya-matahari', 'butuh', 'Cahaya matahari adalah sumber energi fotosintesis.'),
      e('fotosintesis', 'karbon-dioksida', 'butuh', 'Karbon dioksida adalah salah satu bahan fotosintesis.'),
      e('fotosintesis', 'air', 'butuh', 'Air adalah bahan fotosintesis bersama karbon dioksida.'),
      e('fotosintesis', 'oksigen', 'menghasilkan', 'Oksigen adalah hasil samping fotosintesis yang dilepas ke udara.'),
      e('fotosintesis', 'glukosa', 'menghasilkan', 'Glukosa adalah gula hasil fotosintesis.'),
      e('daun', 'klorofil', 'mengandung', 'Daun menangkap cahaya matahari dengan klorofil.'),
      e('klorofil', 'cahaya-matahari', 'menangkap', 'Klorofil adalah zat hijau di daun yang menangkap cahaya matahari.'),
      e('klorofil', 'kloroplas', 'berada di', 'Kloroplas mengandung klorofil.'),
      e('kloroplas', 'daun', 'berada di', 'Fotosintesis berlangsung di dalam kloroplas yang ada di daun.'),
      e('karbon-dioksida', 'stomata', 'masuk lewat', 'Karbon dioksida diserap dari udara lewat stomata.'),
      e('oksigen', 'stomata', 'keluar lewat', 'Oksigen keluar dari daun lewat stomata.'),
      e('air', 'akar', 'diserap oleh', 'Air diserap akar dari tanah.'),
      e('air', 'xilem', 'diangkut lewat', 'Air dari akar diangkut ke daun lewat xilem.'),
      e('xilem', 'daun', 'menuju', 'Xilem mengangkut air dari akar ke daun.'),
      e('glukosa', 'floem', 'diangkut lewat', 'Floem mengangkut glukosa hasil fotosintesis ke seluruh tumbuhan.'),
      e('glukosa', 'gula', 'adalah', 'Glukosa adalah gula hasil fotosintesis.'),
      e('cahaya-matahari', 'energi-cahaya', 'memberi', 'Energi cahaya diubah menjadi energi kimia dalam glukosa.'),
      e('fotosintesis', 'siang-hari', 'paling aktif saat', 'Fotosintesis paling aktif pada siang hari saat cahaya kuat.'),
      e('karbon-dioksida', 'udara', 'berasal dari', 'Karbon dioksida diserap dari udara.'),
    ],
  },
};

// ---------------------------------------------------------------------------
// CONTOH 3 — Majapahit (18 simpul, 19 relasi)
// ---------------------------------------------------------------------------
const MAJAPAHIT: Sample = {
  id: 'majapahit',
  title: 'Majapahit',
  desc: 'Materi sejarah: berdirinya Majapahit, Sumpah Palapa, dan masa keemasannya.',
  stamp: 'CONTOH 03',
  graph: {
    title: 'Majapahit',
    nodes: [
      n('majapahit', 'Majapahit', 'nama', ['Majapahit adalah kerajaan besar di Jawa Timur.', 'Majapahit didirikan oleh Raden Wijaya pada 1293.'], 5),
      n('raden-wijaya', 'Raden Wijaya', 'nama', ['Raden Wijaya mendirikan Majapahit pada 1293.', 'Raden Wijaya adalah pendiri Majapahit.'], 4),
      n('gajah-mada', 'Gajah Mada', 'nama', ['Gajah Mada adalah mahapatih Majapahit.', 'Gajah Mada mengucapkan Sumpah Palapa pada 1336.'], 4),
      n('hayam-wuruk', 'Hayam Wuruk', 'nama', ['Hayam Wuruk memerintah Majapahit pada 1350–1389.', 'Masa Hayam Wuruk adalah masa keemasan Majapahit.'], 4),
      n('sumpah-palapa', 'Sumpah Palapa', 'topik', ['Sumpah Palapa adalah janji Gajah Mada untuk menyatukan Nusantara.', 'Gajah Mada mengucapkan Sumpah Palapa pada 1336.'], 3),
      n('trowulan', 'Trowulan', 'nama', ['Ibu kota Majapahit berada di Trowulan, Jawa Timur.', 'Trowulan kini menjadi situs peninggalan Majapahit.'], 3),
      n('jawa-timur', 'Jawa Timur', 'nama', ['Majapahit adalah kerajaan besar di Jawa Timur.', 'Trowulan terletak di Jawa Timur.'], 2),
      n('thn-1293', '1293', 'tahun', ['Majapahit didirikan pada 1293.', 'Raden Wijaya mendirikan Majapahit pada 1293.'], 3),
      n('thn-1336', '1336', 'tahun', ['Gajah Mada mengucapkan Sumpah Palapa pada 1336.'], 2),
      n('thn-1350', '1350–1389', 'tahun', ['Hayam Wuruk memerintah pada 1350–1389.'], 2),
      n('nagarakertagama', 'Nagarakertagama', 'nama', ['Nagarakertagama adalah kitab yang ditulis Mpu Prapanca.', 'Nagarakertagama menceritakan kejayaan Majapahit.'], 2),
      n('mpu-prapanca', 'Mpu Prapanca', 'nama', ['Nagarakertagama ditulis oleh Mpu Prapanca.', 'Mpu Prapanca adalah pujangga istana Majapahit.'], 2),
      n('perdagangan', 'Perdagangan', 'topik', ['Majapahit menguasai jalur perdagangan dan pelayaran.', 'Perdagangan rempah memperkuat Majapahit.'], 2),
      n('rempah', 'Rempah', 'topik', ['Perdagangan rempah memperkuat Majapahit.', 'Rempah dari Nusantara diperdagangkan ke berbagai negeri.'], 2),
      n('armada-laut', 'Armada laut', 'topik', ['Majapahit memiliki armada laut yang kuat.', 'Armada laut menjaga jalur perdagangan Majapahit.'], 2),
      n('singasari', 'Singasari', 'nama', ['Majapahit berdiri setelah runtuhnya Singasari.', 'Raden Wijaya adalah menantu Kertanegara dari Singasari.'], 2),
      n('kertanegara', 'Kertanegara', 'nama', ['Kertanegara adalah raja Singasari.', 'Raden Wijaya adalah menantu Kertanegara.'], 2),
      n('nusantara', 'Nusantara', 'nama', ['Sumpah Palapa adalah janji untuk menyatukan Nusantara.', 'Pengaruh Majapahit menyebar ke berbagai wilayah Nusantara.'], 2),
    ],
    edges: [
      e('raden-wijaya', 'majapahit', 'mendirikan', 'Raden Wijaya mendirikan Majapahit pada 1293.'),
      e('majapahit', 'thn-1293', 'berdiri pada', 'Majapahit didirikan pada 1293.'),
      e('majapahit', 'trowulan', 'beribu kota di', 'Ibu kota Majapahit berada di Trowulan, Jawa Timur.'),
      e('majapahit', 'jawa-timur', 'berada di', 'Majapahit adalah kerajaan besar di Jawa Timur.'),
      e('gajah-mada', 'majapahit', 'mengabdi pada', 'Gajah Mada adalah mahapatih Majapahit.'),
      e('gajah-mada', 'sumpah-palapa', 'mengucapkan', 'Gajah Mada mengucapkan Sumpah Palapa pada 1336.'),
      e('sumpah-palapa', 'thn-1336', 'diucapkan pada', 'Gajah Mada mengucapkan Sumpah Palapa pada 1336.'),
      e('sumpah-palapa', 'nusantara', 'untuk menyatukan', 'Sumpah Palapa adalah janji untuk menyatukan Nusantara.'),
      e('hayam-wuruk', 'majapahit', 'memerintah', 'Hayam Wuruk memerintah Majapahit pada 1350–1389.'),
      e('hayam-wuruk', 'thn-1350', 'memerintah pada', 'Hayam Wuruk memerintah pada 1350–1389.'),
      e('hayam-wuruk', 'gajah-mada', 'didampingi', 'Gajah Mada mendampingi Hayam Wuruk di masa keemasan.'),
      e('nagarakertagama', 'mpu-prapanca', 'ditulis oleh', 'Nagarakertagama ditulis oleh Mpu Prapanca.'),
      e('nagarakertagama', 'majapahit', 'menceritakan', 'Nagarakertagama menceritakan kejayaan Majapahit.'),
      e('majapahit', 'perdagangan', 'menguasai', 'Majapahit menguasai jalur perdagangan dan pelayaran.'),
      e('perdagangan', 'rempah', 'memperdagangkan', 'Perdagangan rempah memperkuat Majapahit.'),
      e('majapahit', 'armada-laut', 'memiliki', 'Majapahit memiliki armada laut yang kuat.'),
      e('armada-laut', 'perdagangan', 'menjaga', 'Armada laut menjaga jalur perdagangan Majapahit.'),
      e('raden-wijaya', 'kertanegara', 'menantu dari', 'Raden Wijaya adalah menantu Kertanegara dari Singasari.'),
      e('majapahit', 'singasari', 'meneruskan', 'Majapahit berdiri setelah runtuhnya Singasari.'),
    ],
  },
};

export const SAMPLES: Sample[] = [RENDANG, FOTOSINTESIS, MAJAPAHIT];

// ---------------------------------------------------------------------------
// EKSTRAKSI LOKAL dari teks tempelan pengguna
// ---------------------------------------------------------------------------
const STOPWORDS = new Set(
  ('yang dan di ke dari untuk dengan pada adalah itu ini ada juga atau sebagai dalam oleh karena saat setelah sebelum lalu kemudian namun tetapi hanya bisa akan telah sudah masih sangat lebih kurang antara serta bagi tanpa pun nya kah lah tah pun-nya terjadi memberi dipakai membuat menjadi dilakukan digunakan disebut berasal mengandung memakai membutuhkan menghasilkan masuk keluar tumbuh hidup merupakan memiliki berupa terdiri terletak terdapat dikenal berupa').split(' '),
);

const SENT_SPLIT = /(?<=[.!?])\s+|\n+/;

function splitSentences(text: string): string[] {
  return text
    .split(SENT_SPLIT)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length > 8);
}

function wordsOf(sentence: string): string[] {
  return sentence.replace(/[“”"()[\]{}:;,.!?]/g, ' ').split(/\s+/).filter(Boolean);
}

const norm = (w: string) => w.toLowerCase();

/** Ekstrak graf dari teks bebas. Jujur: ini pencocokan kata kunci berbasis frekuensi, bukan AI. */
export function extractGraph(text: string, title = 'Catatanku'): GraphData {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return { title, nodes: [], edges: [] };

  // 1) hitung frekuensi kata (huruf saja, panjang >= 4, bukan stopword)
  const freq = new Map<string, { count: number; display: string; capitalized: number }>();
  const sentenceTerms: string[][] = [];
  for (const s of sentences) {
    const ws = wordsOf(s);
    const terms = new Set<string>();
    for (const w of ws) {
      const clean = w.replace(/[^A-Za-zÀ-ÿ'-]/g, '');
      if (clean.length < 4) continue;
      const key = norm(clean);
      if (STOPWORDS.has(key)) continue;
      const rec = freq.get(key) ?? { count: 0, display: clean, capitalized: 0 };
      rec.count += 1;
      if (/^[A-ZÀ-Þ]/.test(clean)) rec.capitalized += 1;
      if (rec.display.length < clean.length) rec.display = clean;
      freq.set(key, rec);
      terms.add(key);
    }
    sentenceTerms.push([...terms]);
  }

  // 2) frasa kapital 2 kata (mis. "Gajah Mada") yang muncul >= 2x
  const phraseCount = new Map<string, { count: number; display: string }>();
  for (const s of sentences) {
    const ws = wordsOf(s);
    for (let i = 0; i < ws.length - 1; i++) {
      const a = ws[i].replace(/[^A-Za-zÀ-ÿ'-]/g, '');
      const b = ws[i + 1].replace(/[^A-Za-zÀ-ÿ'-]/g, '');
      if (/^[A-ZÀ-Þ]/.test(a) && /^[A-ZÀ-Þ]/.test(b) && a.length >= 3 && b.length >= 3) {
        const key = norm(`${a} ${b}`);
        if (STOPWORDS.has(norm(a)) || STOPWORDS.has(norm(b))) continue;
        const rec = phraseCount.get(key) ?? { count: 0, display: `${a} ${b}` };
        rec.count += 1;
        phraseCount.set(key, rec);
      }
    }
  }

  // 3) pilih simpul: frasa kapital (count>=2) + kata (count>=2), maks 24, skor = count
  const candidates: { key: string; display: string; count: number; type: NodeType }[] = [];
  for (const [key, rec] of phraseCount) {
    if (rec.count >= 2) candidates.push({ key, display: rec.display, count: rec.count, type: 'nama' });
  }
  for (const [key, rec] of freq) {
    if (rec.count >= 2) {
      candidates.push({
        key,
        display: rec.display,
        count: rec.count,
        type: rec.capitalized > rec.count / 2 ? 'nama' : 'topik',
      });
    }
  }
  // buang kata tunggal yang sudah tercakup frasa
  const phraseWords = new Set<string>();
  for (const c of candidates) if (c.type === 'nama' && c.display.includes(' ')) c.display.split(' ').forEach((w) => phraseWords.add(norm(w)));
  const picked = candidates
    .filter((c) => !(c.type === 'topik' && phraseWords.has(c.key)))
    .sort((a, b) => b.count - a.count || b.display.length - a.display.length)
    .slice(0, 24);
  const pickedKeys = new Set(picked.map((p) => p.key));

  const nodeByKey = new Map<string, GraphNode>();
  for (const p of picked) {
    const ev = sentences.filter((s) => norm(s).includes(p.key)).slice(0, 3);
    nodeByKey.set(p.key, {
      id: p.key.replace(/[^a-z0-9]+/g, '-'),
      label: p.display,
      type: p.type,
      evidence: ev,
      weight: Math.min(5, p.count),
    });
  }

  // 4) relasi: dua simpul muncul di kalimat yang sama -> edge, bukti = kalimat pertama
  const edgeMap = new Map<string, GraphEdge>();
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const inS = [...pickedKeys].filter((k) => norm(s).includes(k));
    for (let a = 0; a < inS.length; a++) {
      for (let b = a + 1; b < inS.length; b++) {
        const [ka, kb] = [inS[a], inS[b]].sort();
        const id = `${ka}__${kb}`;
        const ex = edgeMap.get(id);
        if (ex) ex.weight += 1;
        else {
          edgeMap.set(id, {
            id: `${nodeByKey.get(ka)!.id}__${nodeByKey.get(kb)!.id}`,
            source: nodeByKey.get(ka)!.id,
            target: nodeByKey.get(kb)!.id,
            label: 'muncul bersama',
            evidence: s,
            weight: 1,
          });
        }
      }
    }
  }
  // buang edge berat 1 jika edge sudah > 40 (simpan yang berbobot), lalu batasi 60
  let edges = [...edgeMap.values()].sort((a, b) => b.weight - a.weight);
  if (edges.length > 40) edges = edges.filter((x) => x.weight >= 2);
  edges = edges.slice(0, 60);
  // label relasi yang lebih bermakna untuk edge berbobot tinggi
  for (const ed of edges) {
    if (ed.weight >= 3) ed.label = 'sering muncul bersama';
  }
  return { title, nodes: [...nodeByKey.values()], edges };
}

// ---------------------------------------------------------------------------
// Deep-link + persistence
// ---------------------------------------------------------------------------
export const STORAGE_KEY = 'graphlihat:v1';

export function encodeGraph(g: GraphData): string {
  const json = JSON.stringify(g);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeGraph(code: string): GraphData | null {
  try {
    const b64 = code.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b64)));
    const g = JSON.parse(json) as GraphData;
    if (!g || !Array.isArray(g.nodes) || !Array.isArray(g.edges)) return null;
    if (g.nodes.length > 200 || g.edges.length > 400) return null;
    return g;
  } catch {
    return null;
  }
}

export function validateGraph(g: unknown): g is GraphData {
  if (!g || typeof g !== 'object') return false;
  const d = g as GraphData;
  return (
    typeof d.title === 'string' &&
    Array.isArray(d.nodes) &&
    Array.isArray(d.edges) &&
    d.nodes.every((x) => x && typeof x.id === 'string' && typeof x.label === 'string') &&
    d.edges.every((x) => x && typeof x.source === 'string' && typeof x.target === 'string')
  );
}
