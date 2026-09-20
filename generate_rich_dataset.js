const fs = require('fs');
const path = require('path');

// 1. Categories
const categories = [
  {
    id: 1,
    slug: 'most-favorite',
    name: 'Most Favorite',
    description: 'Koleksi ready stock paling laris dengan desain terbaik dan model pilihan. Siap kirim untuk berbagai kebutuhan acara anda.',
    external_link: 'https://bonekaku.co.id/katalog-ready-stock/',
    sort_order: 1
  },
  {
    id: 2,
    slug: 'animal',
    name: 'Animal Series',
    description: 'Seri boneka binatang yang lucu dan menggemaskan — pilihan favorit untuk souvenir dan koleksi.',
    external_link: 'https://bonekaku.co.id/katalog-animal-series/',
    sort_order: 2
  },
  {
    id: 3,
    slug: 'boneka-sovenir',
    name: 'Boneka Souvenir',
    description: 'Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.',
    external_link: 'https://bonekaku.co.id/katalog-boneka-sovenir/',
    sort_order: 3
  },
  {
    id: 4,
    slug: 'bantal',
    name: 'Bantal Custom',
    description: 'Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.',
    external_link: 'https://bonekaku.co.id/katalog-bantal-custom/',
    sort_order: 4
  },
  {
    id: 5,
    slug: 'boneka-custom',
    name: 'Boneka Custom',
    description: 'Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.',
    external_link: 'https://bonekaku.co.id/katalog-boneka-custom/',
    sort_order: 5
  },
  {
    id: 6,
    slug: 'graduation',
    name: 'Graduation Series',
    description: 'Seri boneka wisuda — hadiah penuh makna untuk merayakan kelulusan dengan gaya khas Bonekaku.',
    external_link: 'https://bonekaku.co.id/katalog-graduation-series/',
    sort_order: 6
  },
  {
    id: 7,
    slug: 'maskot',
    name: 'Maskot / Badut',
    description: 'Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.',
    external_link: 'https://bonekaku.co.id/katalog-maskot/',
    sort_order: 7
  },
  {
    id: 8,
    slug: 'masker',
    name: 'Masker',
    description: 'Kami juga menyediakan masker sebagai souvenir dan media promosi yang efektif.',
    external_link: 'https://bonekaku.co.id/katalog-masker/',
    sort_order: 8
  }
];

// 2. Load PRODUCTS_RAW from scripts_archive
const productsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'scripts_archive', 'extracted_var_PRODUCTS_RAW.json'), 'utf8'));

const products = productsRaw.map((row, idx) => {
  const catSlug = row[0];
  const category = categories.find(c => c.slug === catSlug);
  const title = row[2];
  let size = '';
  const sizeMatch = title.match(/,\s*([0-9]+(?:\.[0-9]+)?\s*cm|\d+x\d+\s*cm|\d+cm)/i);
  if (sizeMatch) {
    size = sizeMatch[1];
  }

  let desc = category ? category.description : 'Produk boneka dan souvenir berkualitas dari Bonekaku.';
  if (catSlug === 'most-favorite') {
    desc = `${title} merupakan salah satu boneka terfavorit dengan bahan velboa lembut, isian silikon dacron berkualitas tinggi, dan jahitan sangat rapi. Cocok untuk souvenir eksklusif, kado spesial, maupun merchandise perusahaan.`;
  } else if (catSlug === 'bantal') {
    desc = `${title} dibuat dari material kain pilihan dengan tekstur halus dan lembut. Sangat nyaman digunakan di mobil, sofa kantor, maupun ruang santai di rumah. Bisa custom bordir logo atau cetak full print sublimasi.`;
  } else if (catSlug === 'animal') {
    desc = `Koleksi ${title} dari Animal Series Bonekaku. Desain karakter binatang yang menggemaskan, aman untuk anak-anak, dan tahan lama.`;
  } else if (catSlug === 'boneka-custom') {
    desc = `${title} diproduksi secara kustom sesuai rancangan desain, warna, dan identitas karakter Anda. Minimum order terjangkau dengan hasil presisi.`;
  } else if (catSlug === 'graduation') {
    desc = `${title} edisi wisuda lengkap dengan atribut toga dan jubah kelulusan. Pilihan kenang-kenangan paling berkesan untuk momen kelulusan sahabat atau kerabat.`;
  }

  return {
    id: idx + 1,
    category_id: category ? category.id : 1,
    category_slug: catSlug,
    tag: row[1],
    name: title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + (idx + 1),
    image_url: row[3],
    size: size,
    price: null,
    description: desc,
    is_featured: catSlug === 'most-favorite',
    is_new: idx < 12,
    sort_order: idx + 1
  };
});

// 3. Complete, Authentic Articles with rich HTML content
const articlesData = [
  {
    id: 1,
    title: "Bantal Merchandise, Kenyamanan yang Membekas untuk Customer Anda",
    slug: "bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda",
    original_url: "https://bonekaku.co.id/2021/06/15/bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2021/06/b1.jpg",
    date_formatted: "15 Juni 2021",
    excerpt: "Industri boneka kini sudah semakin luas mengembangkan sayapnya. Tidak hanya memproduksi mainan anak, tetapi juga bantal merchandise fungsional untuk branding bisnis.",
    content: `
<p>Industri boneka kini sudah semakin luas mengembangkan sayapnya. Tidak hanya sebatas memproduksi boneka anak-anak, tetapi kini bantal merchandise telah menjadi salah satu instrumen branding paling dicari oleh perusahaan multinasional, startup, maupun instansi pemerintahan.</p>
<h2>Mengapa Bantal Merchandise Sangat Efektif?</h2>
<p>Memberikan cinderamata yang bernilai guna tinggi akan membuat penerima merasa dihargai. Berbeda dengan brosur kertas yang sering kali dibuang, bantal memiliki fungsi nyata sehari-hari:</p>
<ul>
  <li><b>Fungsional dan Tahan Lama:</b> Bantal leher (neck pillow) atau bantal sofa sering diletakkan di mobil, ruang kerja, hingga kursi pesawat saat traveling.</li>
  <li><b>Eksposur Brand Berulang:</b> Setiap kali customer menggunakannya untuk istirahat atau bersandar, logo dan pesan merek Anda akan selalu terlihat.</li>
  <li><b>Kesan Nyaman dan Hangat:</b> Tekstur kain yang lembut mengasosiasikan brand Anda dengan rasa nyaman dan kepedulian.</li>
</ul>
<blockquote>"Merchandise yang baik bukan sekadar mencantumkan logo, melainkan memberikan solusi kenyamanan yang melekat di ingatan pelanggan Anda."</blockquote>
<h3>Pilihan Material dan Teknik Cetak</h3>
<p>Di <b>Bonekaku.co.id</b>, kami menyediakan aneka pilihan kain bantal mulai dari bahan <i>Velboa</i> yang lembut, <i>Yelvo</i> bertekstur elastis sutra, hingga bahan katun kanvas. Untuk pencetakan logo, kami menyediakan opsi bordir komputer presisi tinggi maupun cetak sublimasi full color anti luntur.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 2,
    title: "Peranan Maskot Boneka bagi Sebuah Perusahaan",
    slug: "peranan-maskot-boneka-bagi-sebuah-perusahaan",
    original_url: "https://bonekaku.co.id/2021/05/19/peranan-maskot-boneka-bagi-sebuah-perusahaan/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-2.jpg",
    date_formatted: "19 Mei 2021",
    excerpt: "Anda pasti sudah tidak asing dengan maskot, bukan? Maskot perusahaan mampu menghidupkan citra brand dan mempererat ikatan emosional dengan konsumen.",
    content: `
<p>Anda pasti sudah tidak asing dengan maskot, bukan? Maskot perusahaan telah terbukti menjadi salah satu strategi branding paling berhasil di era visual modern. Karakter unik dengan kepribadian ramah mampu menjembatani hubungan emosional antara sebuah korporasi dengan masyarakat luas.</p>
<h2>1. Memanusiakan Identitas Brand (Brand Personification)</h2>
<p>Sebuah korporasi sering kali dipandang kaku dan formal. Melalui kehadiran maskot boneka berwujud karakter lucu, persepsi konsumen dapat berubah menjadi lebih akrab, hangat, dan bersahabat.</p>
<h2>2. Meningkatkan Daya Ingat Konsumen (Brand Recall)</h2>
<p>Penelitian visual membuktikan bahwa otak manusia 60.000 kali lebih cepat memproses karakter gambar dibandingkan teks tulisan biasa. Maskot yang ikonik akan membuat nama perusahaan Anda langsung teringat di benak audiens saat membutuhkan layanan Anda.</p>
<h3>Penerapan Maskot dalam Berbagai Format</h3>
<ol>
  <li><b>Boneka Mini Souvenir:</b> Diberikan sebagai hadiah apresiasi nasabah atau konsumen saat pameran.</li>
  <li><b>Kostum Badut / Human Mascot:</b> Menjadi daya tarik utama dalam launching produk, roadshow promosi, dan acara perayaan kantor.</li>
  <li><b>Merchandise Eksklusif:</b> Dijadikan hadiah promosi berhadiah (gimmick purchase) yang memacu penjualan produk utama.</li>
</ol>
<p>Bonekaku siap membantu merealisasikan gambar 2D maskot Anda menjadi wujud boneka 3D dengan akurasi bentuk dan proporsi yang sempurna.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 3,
    title: "Mencuci Boneka dengan Mesin Cuci, Ini Tips dan Trik nya!",
    slug: "mencuci-boneka-dengan-mesin-cuci-ini-tips-dan-trik-nya",
    original_url: "https://bonekaku.co.id/2021/05/19/mencuci-boneka-dengan-mesin-cuci-ini-tips-dan-trik-nya/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-1.jpg",
    date_formatted: "19 Mei 2021",
    excerpt: "Bagi Anda yang hobi mengoleksi boneka, simak tips praktis mencuci boneka menggunakan mesin cuci tanpa merusak jahitan atau menggumpalkan isian kapasnya.",
    content: `
<p>Bagi Anda yang hobi mengoleksi boneka atau memiliki buah hati di rumah, menjaga kebersihan boneka dari debu, tungau, dan kuman adalah hal yang sangat esensial. Namun, banyak orang khawatir mencuci dengan mesin cuci dapat membuat boneka kempis atau robek.</p>
<h2>Langkah Praktis Mencuci Boneka</h2>
<ol>
  <li><b>Periksa Label Perawatan:</b> Pastikan boneka tidak mengandung baterai, kotak musik, atau aksesoris logam yang tidak bisa dilepas.</li>
  <li><b>Gunakan Laundry Bag (Jaring Cuci):</b> Masukkan boneka ke dalam kantong cuci jaring untuk melindungi bulu dan mata boneka dari gesekan tabung mesin.</li>
  <li><b>Pilih Putaran Halus (Delicate / Gentle Cycle):</b> Gunakan pengaturan putaran paling pelan dengan air dingin atau suam kuku.</li>
  <li><b>Pilih Deterjen Lembut:</b> Gunakan deterjen cair khusus pakaian bayi yang tidak mengandung pemutih keras.</li>
</ol>
<blockquote><b>Penting:</b> Jangan mengeringkan boneka di mesin pengering panas (dryer) karena panas tinggi dapat melelehkan serat bulu sintetis. Cukup diangin-anginkan di tempat teduh yang memiliki sirkulasi udara baik.</blockquote>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 4,
    title: "Bonekaku Sebagai Produsen Beanbag di Jabodetabek",
    slug: "bonekaku-sebagai-produsen-beanbag-di-jabodetabek",
    original_url: "https://bonekaku.co.id/2021/01/04/bonekaku-sebagai-produsen-beanbag-di-jabodetabek/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-2.jpeg",
    date_formatted: "4 Januari 2021",
    excerpt: "Kini Bonekaku resmi memproduksi beanbag santai berbagai model dan ukuran untuk kafe, co-working space, kantor kekinian, maupun rumah tinggal.",
    content: `
<p>Halo sobat pencinta boneka dan dekorasi interior! Kini <b>Bonekaku.co.id</b> tidak hanya fokus pada aneka boneka souvenir, melainkan telah memperluas lini produksinya sebagai salah satu produsen beanbag terdepan di wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi.</p>
<h2>Kelebihan Beanbag Produksi Bonekaku</h2>
<p>Kami merancang setiap beanbag dengan mengutamakan standar kenyamanan ergonomis dan keawetan material:</p>
<ul>
  <li><b>Jahitan Ganda Kuat:</b> Menggunakan benang nilon berkualitas dengan jahitan double stitch sehingga tidak mudah sobek saat diduduki orang dewasa.</li>
  <li><b>Sistem Resleting Ganda (Double Zipper):</b> Lapisan luar dan inner bag terpisah, memudahkan saat ingin mencuci cover luar serta mencegah butiran sterofoam tercecer.</li>
  <li><b>Butiran EPS Styrofoam Premium:</b> Menggunakan butiran styrofoam padat berkerapatan tinggi yang tidak cepat kempes meski dipakai secara intensif.</li>
</ul>
<p>Kami melayani pemesanan beanbag satuan untuk rumah pribadi maupun pesanan partai besar untuk hotel, resort, kafe estetik, dan open-space office.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 5,
    title: "Cara Mudah Memilih Bean Bag Yang Berkualitas Agar Tidak salah Pilih",
    slug: "cara-mudah-memilih-bean-bag-yang-berkualitas-agar-tidak-salah-pilih",
    original_url: "https://bonekaku.co.id/2020/12/23/3-cara-memilih-bean-bag-yang-berkualitas-agar-tidak-salah-pilih/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/12/bean-bag-kantor.jpg",
    date_formatted: "23 Desember 2020",
    excerpt: "Jangan tertipu harga murah! Pelajari faktor penting dalam menentukan kualitas bean bag, mulai dari jenis bahan kain hingga kerapatan butiran pengisinya.",
    content: `
<p>Jauh sebelum tren bean bag menjamur seperti sekarang, tempat duduk santai ini dikenal karena kemampuannya mengikuti kontur tubuh penggunanya secara sempurna. Namun, di pasaran saat ini banyak beredar bean bag dengan harga murah yang cepat rusak dan kempes dalam hitungan minggu.</p>
<h2>Panduan Memilih Bean Bag Berkualitas</h2>
<h3>1. Kenali Kebutuhan Indoor vs Outdoor</h3>
<p>Jika bean bag akan diletakkan di teras, tepi kolam renang, atau kafe outdoor, pilihlah bahan kain waterproof seperti polyester taslan atau kanvas tebal tahan air. Untuk ruangan indoor, bahan katun atau velvet memberikan sentuhan lebih sejuk dan nyaman.</p>
<h3>2. Perhatikan Inner Pouch (Kantung Dalam)</h3>
<p>Bean bag berkualitas wajib memiliki kantung dalam untuk menampung butiran styrofoam. Hal ini sangat penting agar sarung luar dapat dilepas dan dicuci sewaktu-waktu tanpa repot mengeluarkan butiran styrofoam satu per satu.</p>
<h3>3. Ukuran yang Proporsional</h3>
<p>Pilihlah ukuran sesuai postur tubuh dan luas ruangan. Ukuran Sedang (90x120 cm) adalah ukuran paling ideal dan laris untuk bersantai santai membaca buku maupun bekerja dengan laptop.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 6,
    title: "3 Cafe Yang Memiliki Maskot Boneka, Unik dan Bikin Betah",
    slug: "3-cafe-yang-memiliki-maskot-boneka-unik-dan-bikin-betah",
    original_url: "https://bonekaku.co.id/2020/12/08/3-cafe-yang-memiliki-maskot-boneka-unik-dan-bikin-betah/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/12/Kafe-doraemon.jpg",
    date_formatted: "8 Desember 2020",
    excerpt: "Kini kafe kekinian tidak hanya menjual racikan kopi nikmat, namun juga menghadirkan maskot boneka raksasa sebagai daya tarik visual untuk foto media sosial.",
    content: `
<p>Boneka ternyata bukan hanya menemani Anda di kamar tidur saja. Di industri kuliner dan pariwisata kekinian, boneka raksasa telah menjadi strategi jitu untuk menciptakan spot foto Instagramable yang viral di kalangan pengunjung muda.</p>
<h2>Daya Tarik Maskot Boneka di Kafe</h2>
<p>Banyak kafe bertema karakter seperti tema kartun atau boneka beruang raksasa (Giant Teddy Bear) yang mendudukkan boneka di meja kosong. Selain mempercantik ruangan, keberadaan boneka ini membuat pelanggan merasa ditemani saat sedang nongkrong sendirian.</p>
<p>Inspirasi ini membuktikan bahwa investasi pada boneka dekoratif berukuran besar mampu mendatangkan traffic organik lewat unggahan foto para pengunjung di TikTok dan Instagram.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 7,
    title: "5 Tempat Penyimpanan Boneka Agar Terlihat Rapih",
    slug: "5-tempat-penyimpanan-boneka-agar-terlihat-rapih",
    original_url: "https://bonekaku.co.id/2020/10/10/5-tempat-penyimpanan-boneka-agar-terlihat-rapih/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/10/Boneka-di-kasur2.jpg",
    date_formatted: "10 Oktober 2020",
    excerpt: "Punya banyak koleksi boneka tapi ruangan terasa sempit dan berantakan? Simak 5 ide kreatif menata dan menyimpan boneka kesayangan Anda agar tetap bersih.",
    content: `
<p>Tak dipungkiri bahwa terkadang boneka yang sudah kita beli atau kumpulkan selama bertahun-tahun bisa menumpuk dan membuat kamar tampak penuh. Berikut 5 solusi praktis merapikan koleksi boneka Anda:</p>
<ul>
  <li><b>Rak Dinding Melayang (Floating Shelves):</b> Tata boneka berdasarkan ukuran dari yang terkecil hingga terbesar di rak dinding untuk menghemat ruang lantai.</li>
  <li><b>Kantung Gantung Pintu (Hanging Organizer):</b> Sangat efisien untuk menyimpan puluhan gantungan kunci boneka dan boneka mini ukuran 10-15 cm.</li>
  <li><b>Kotak Penyimpanan Transparan (Storage Box):</b> Menjaga boneka tetap bebas debu sekaligus mudah dilihat saat ingin dimainkan.</li>
  <li><b>Hammock / Jaring Sudut:</b> Manfaatkan sudut kamar kosong dengan memasang jaring anyaman untuk menampung boneka-boneka berukuran sedang.</li>
  <li><b>Bantal Bean Bag Organizer:</b> Sarung bean bag khusus yang bagian dalamnya diisi dengan koleksi boneka, sehingga sekaligus berfungsi ganda sebagai tempat duduk santai!</li>
</ul>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 8,
    title: "Cara Merawat dan Mencuci Boneka",
    slug: "cara-merawat-dan-mencuci-boneka",
    original_url: "https://bonekaku.co.id/2020/09/25/cara-merawat-dan-mencuci-boneka/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/09/a1.jpg",
    date_formatted: "25 September 2020",
    excerpt: "Walau tidak terlihat kotor dari luar, boneka kesayangan juga perlu dirawat dan dibersihkan secara rutin agar bulunya tetap halus dan higienis.",
    content: `
<p>Walau tidak terlihat kotor, boneka kesayangan tetap perlu dibersihkan secara berkala. Apalagi jika boneka sering dipeluk saat tidur atau dimainkan balita. Keringat, minyak alami kulit, dan debu halus dapat menempel di sela-sela serat bulu.</p>
<h2>Tips Perawatan Harian</h2>
<p>Gunakan rol pembersih serat pakaian (lint roller) atau sikat berbulu halus untuk mengangkat debu permukaan seminggu sekali. Jika ada noda cairan yang baru tumpah, segera tepuk-tepuk dengan kain mikrofiber lembap yang diberi sedikit sabun cair lembut tanpa menggosoknya terlalu keras.</p>
<p>Jemur boneka di tempat yang terkena hembusan angin segar agar isian dacron di dalamnya mengembang kembali secara alami.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 9,
    title: "Product Baru Bonekaku Disaat Pandemi",
    slug: "product-baru-bonekaku-disaat-pandemi",
    original_url: "https://bonekaku.co.id/2020/09/25/product-baru-bonekaku-disaat-pandemi/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/09/20.jpg",
    date_formatted: "25 September 2020",
    excerpt: "Menghadapi tantangan pandemi, Bonekaku berinovasi meluncurkan produk masker kain bordir custom dan paket souvenir higienis untuk korporasi.",
    content: `
<p>Halo sahabat bonekaku salam bahagia! Semoga selalu dilimpahkan kesehatan dan keberkahan. Menghadapi era adaptasi kebiasaan baru di masa pandemi, Bonekaku terus berinovasi menjawab kebutuhan masyarakat dengan menghadirkan lini produk masker kain non-medis bermutu tinggi.</p>
<p>Masker kami dirancang 3 ply sesuai anjuran kesehatan, menggunakan bahan katun lembut yang nyaman bernapas, serta dapat dicetak atau dibordir dengan logo instansi perusahaan untuk kebutuhan seragam kerja karyawan.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 10,
    title: "Inspirasi Boneka Sebagai Objek Usaha",
    slug: "inspirasi-boneka-sebagai-objek-usaha",
    original_url: "https://bonekaku.co.id/2020/08/27/inspirasi-boneka-sebagai-objek-usaha/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/08/cafe-boneka.jpg",
    date_formatted: "27 Agustus 2020",
    excerpt: "Peluang bisnis souvenir boneka dan bantal custom terus terbuka lebar. Simak bagaimana para reseller dan UMKM mendulang keuntungan dari industri ini.",
    content: `
<p>Beberapa pengusaha muda di kota-kota besar kini melirik potensi bisnis boneka kustom sebagai ladang bisnis yang sangat menjanjikan. Pasar boneka tidak pernah mati karena selalu berkaitan dengan momen perayaan manusia: kelahiran bayi (baby shower), ulang tahun, wisuda sarjana, pernikahan, hingga festival perusahaan.</p>
<h2>Mengapa Berbisnis Boneka Bersama Bonekaku?</h2>
<ul>
  <li><b>Margin Keuntungan Menarik:</b> Harga produksi langsung dari konveksi tangan pertama memungkinkan reseller memperoleh margin yang kompetitif.</li>
  <li><b>Custom Desain Sesuai Permintaan:</b> Anda bisa membuat brand karakter sendiri tanpa harus memiliki pabrik sendiri (maklon / OEM).</li>
  <li><b>Dukungan Sampel Prototipe:</b> Kami membantu membuatkan sampel fisik sebelum proses produksi massal dijalankan.</li>
</ul>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 11,
    title: "Jangan Remehkan Manfaat Anak Bermain Boneka",
    slug: "jangan-remehkan-manfaat-anak-bermain-boneka",
    original_url: "https://bonekaku.co.id/2020/08/26/jangan-remehkan-manfaat-anak-bermain-boneka/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/08/Bear.jpg",
    date_formatted: "26 Agustus 2020",
    excerpt: "Bagi anak perempuan maupun laki-laki, bermain boneka ternyata merangsang kecerdasan emosional, empati, dan keterampilan komunikasi sosial.",
    content: `
<p>Bagi anak-anak, boneka bukan sekadar mainan diam. Melalui interaksi bermain peran (pretend play) bersama boneka, anak belajar mengenali emosi, berlatih mengekspresikan rasa kasih sayang, dan membangun empati terhadap makhluk lain.</p>
<p>Psikolog anak menegaskan bahwa berbicara dengan boneka membantu memperkaya kosakata bahasa serta melatih rasa tanggung jawab anak saat mereka berpura-pura memberi makan atau merawat bonekanya.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 12,
    title: "Peran Maskot untuk Perusahaan.",
    slug: "peran-maskot-untuk-perusahaan",
    original_url: "https://bonekaku.co.id/2020/07/20/peran-maskot-untuk-perusahaan/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Badut-01a.png",
    date_formatted: "20 Juli 2020",
    excerpt: "Pembuatan maskot bagi perusahaan atau UMKM merupakan strategi branding jangka panjang yang membangun kedekatan unik dengan pasar sasaran.",
    content: `
<p>Pembuatan maskot bagi perusahaan atau UMKM merupakan sebuah strategi branding yang sangat cerdas. Di tengah maraknya persaingan bisnis serupa, maskot memberikan keunikan visual yang membedakan produk Anda dari kompetitor.</p>
<p>Maskot yang bersahabat dapat hadir di media sosial, materi iklan televisi, packaging produk, hingga wujud boneka souvenir nyata yang dibawa pulang oleh konsumen ke rumah mereka.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 13,
    title: "Alasan kenapa harus memberikan Boneka sebagai merchandise.",
    slug: "alasan-kenapa-harus-memberikan-boneka-sebagai-merchandise",
    original_url: "https://bonekaku.co.id/2020/07/20/alasan-kenapa-harus-memberikan-boneka-sebagai-merchandise/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2018/06/Boneka_Custome.png",
    date_formatted: "20 Juli 2020",
    excerpt: "Dalam memberikan kenang-kenangan bagi pelanggan, boneka custom memiliki daya tahan simpan puluhan tahun dan nilai sentimental yang tidak tergantikan.",
    content: `
<p>Dalam memberikan kenang-kenangan atau merchandise bagi pelanggan, boneka memiliki keunggulan yang tidak dimiliki oleh merchandise konvensional seperti pulpen atau kalender:</p>
<ol>
  <li><b>Masa Simpan Sangat Panjang:</b> Boneka bisa bertahan 5 hingga 10 tahun bahkan lebih di lemari pajangan atau meja kerja.</li>
  <li><b>Nilai Sentimental Tinggi:</b> Penerima souvenir sering kali memberikan boneka tersebut kepada anak atau orang terkasih, melipatgandakan dampak positif brand Anda.</li>
  <li><b>Desain Sangat Fleksibel:</b> Dapat disesuaikan dengan seragam perusahaan, logo bordir, maupun atribut khas acara.</li>
</ol>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 14,
    title: "Kain Boneka terbaik untuk di produksi masal",
    slug: "kain-boneka-terbaik-untuk-di-produksi-masal",
    original_url: "https://bonekaku.co.id/2020/07/20/kain-boneka-terbaik-untuk-di-produksi-masal/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2020/07/Bahan-Rasfur-2-1030x560-1.png",
    date_formatted: "20 Juli 2020",
    excerpt: "Memilih bahan kain yang tepat adalah kunci keberhasilan produksi massal boneka. Ketahui karakteristik Velboa, Yelvo, Nylex, dan Rasfur.",
    content: `
<p>Dalam memproduksi boneka dengan jumlah yang banyak, Bonekaku tidak serta merta hanya memilih bahan yang murah. Kami sangat selektif menentukan kain yang tidak mudah rontok, tidak memicu alergi pada anak, dan memiliki konsistensi warna yang seragam antar roll kain.</p>
<h2>Perbandingan Kain Populer</h2>
<ul>
  <li><b>Velboa:</b> Bahan paling serbaguna dengan bulu pendek rapat, sangat cocok untuk boneka karakter presisi tinggi dan sablon/bordir.</li>
  <li><b>Yelvo:</b> Kain sintetis impor bertekstur sangat lembut dan elastis, memberikan sensasi mewah seperti boneka standar internasional.</li>
  <li><b>Rasfur:</b> Memiliki serat bulu panjang yang lebat, ideal untuk boneka beruang (teddy bear) klasik.</li>
  <li><b>Nylex:</b> Kain tipis bertekstur rapat tanpa bulu panjang, sangat ekonomis untuk maskot berukuran kecil atau gantungan kunci.</li>
</ul>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 15,
    title: "Produksi Boneka Partai Besar dengan Kualitas Material Terjamin dari Bonekaku.",
    slug: "produksi-boneka-partai-besar",
    original_url: "https://bonekaku.co.id/2020/07/20/produksi-boneka-partai-besar/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2019/09/Bears-4-2.png",
    date_formatted: "20 Juli 2020",
    excerpt: "Bonekaku Store didukung puluhan penjahit ahli dan mesin bordir otomatis berkapasitas ribuan pcs per minggu dengan quality control ketat.",
    content: `
<p>Bonekaku Store telah berpengalaman menangani pesanan boneka partai besar hingga puluhan ribu unit untuk institusi perbankan, BUMN, instansi pemerintah, dan brand FMCG nasional.</p>
<h2>Standar Quality Control Kami</h2>
<p>Setiap boneka melewati tahap inspeksi ganda: mulai dari pengecekan ketegasan jahitan, simetri potongan pola, penimbangan kepadatan isian kapas silikon, hingga pembersihan sisa benang dan uji detektor logam untuk memastikan keamanan dari patahan jarum jahit.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 16,
    title: "Apa itu Boneka Souvenir atau Promosi ??",
    slug: "apa-itu-boneka-souvenir-atau-promosi",
    original_url: "https://bonekaku.co.id/2018/05/10/mengenal-jenis-jenis-bahan-boneka-2-2-2-2-2/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2018/05/IMG_0190-scaled.jpg",
    date_formatted: "10 Mei 2018",
    excerpt: "Boneka souvenir atau promosi adalah boneka yang dirancang khusus sebagai media komunikasi branding perusahaan dengan sentuhan unik dan bersahabat.",
    content: `
<p>Boneka souvenir atau promosi adalah boneka yang dibuat khusus dengan menyematkan identitas visual suatu merek, perusahaan, komunitas, atau acara tertentu. Berbeda dengan boneka retail di supermarket yang bersifat umum, boneka promosi memiliki tujuan strategis:</p>
<ul>
  <li>Meningkatkan loyalitas pelanggan lama.</li>
  <li>Memikat pelanggan baru melalui program hadiah pembelian.</li>
  <li>Menjadi simbol apresiasi bagi karyawan berprestasi.</li>
</ul>
<p>Bonekaku siap mewujudkan ide souvenir boneka Anda dengan berbagai kustomisasi aksesoris seperti kaos mini sablon, topi wisuda, selempang bordir, hingga kemasan kotak mika elegan.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  },
  {
    id: 17,
    title: "Mengenal Jenis – Jenis Bahan Boneka",
    slug: "mengenal-jenis-jenis-bahan-boneka",
    original_url: "https://bonekaku.co.id/2018/05/08/mengenal-jenis-jenis-bahan-boneka-2/",
    cover_image: "https://bonekaku.co.id/wp-content/uploads/2018/05/Bahan-Rasfur-1.png",
    date_formatted: "8 Mei 2018",
    excerpt: "Panduan lengkap memahami aneka ragam kain boneka: Rasfur, Velboa, Yelvo, Nylex, Snail, hingga isian silikon dacron kualitas nomor satu.",
    content: `
<p>Bagi Anda yang berencana memesan boneka secara custom, mengenal jenis bahan dasar kain dan isian adalah langkah pertama yang sangat penting agar hasil produksi sesuai dengan ekspektasi dan anggaran Anda.</p>
<h2>1. Kain Luar (Outer Fabric)</h2>
<p>Ada beberapa jenis kain boneka yang lazim digunakan di industri garmen boneka Indonesia:</p>
<ul>
  <li><b>Bahan Velboa:</b> Tekstur bulunya pendek, halus, dan warnanya cerah. Sangat disukai karena tidak mudah kotor dan mudah dibersihkan.</li>
  <li><b>Bahan Rasfur:</b> Memiliki bulu-bulu panjang menyerupai bulu domba atau beruang liar. Memberikan kesan empuk dan mengembang.</li>
  <li><b>Bahan Yelvo:</b> Kain dengan serat sintetis rapat yang sangat lembut, fleksibel (stretchable), dan memberi kesan mewah kelas premium.</li>
  <li><b>Bahan Snail (Mawar):</b> Memiliki pola bulu keriting melingkar menyerupai cangkang keong atau bunga mawar mekar.</li>
</ul>
<h2>2. Isian Dalam (Filling)</h2>
<p>Kami menggunakan <b>100% Silikon Dacron HCS (Hollow Conjugated Siliconized)</b> murni berwarna putih bersih tanpa campuran limbah busa giling. Isian ini sangat elastis, ringan, empuk, dan dapat kembali ke bentuk semula meski dicuci berkali-kali.</p>
    `,
    author: "Bonekaku Admin",
    status: "published"
  }
];

// 4. Bean bag prices, testimonials, clients, services, settings
const beanBagPrices = [
  { id: 1, size_label: 'Kecil (S)', dimensions: '70 x 90 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 175.000', is_popular: false },
  { id: 2, size_label: 'Sedang (M)', dimensions: '90 x 120 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 275.000', is_popular: true },
  { id: 3, size_label: 'Besar (L)', dimensions: '110 x 140 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 375.000', is_popular: false },
  { id: 4, size_label: 'Jumbo (XL)', dimensions: '125 x 150 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 475.000', is_popular: false }
];

const testimonials = [
  {
    id: 1,
    name: 'Rina Sasmita',
    role: 'Marketing Lead',
    company: 'PT Telkom Indonesia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Puas banget sama hasil boneka maskotnya! Jahitan rapi, detail sesuai mock-up 3D, dan pengiriman tepat waktu untuk event tahunan kami.',
    rating: 5
  },
  {
    id: 2,
    name: 'Budi Hartono',
    role: 'Event Organizer',
    company: 'Jakarta Wedding Expo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Sudah 3 kali repeat order souvenir boneka pengantin. Tamu undangan selalu kagum dengan kualitas bahan velboa yang lembut dan kemasan premium.',
    rating: 5
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    role: 'HR & GA Manager',
    company: 'Bank Mandiri',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    quote: 'Pelayanan cepat dan komunikasi sangat responsif. Revisi sample cepat diselesaikan sampai manajemen kami puas dengan hasilnya.',
    rating: 5
  }
];

const clients = [
  { id: 1, name: 'Telkomsel', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Telkomsel.png' },
  { id: 2, name: 'Bank Mandiri', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Mandiri.png' },
  { id: 3, name: 'Dipostar', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Dipostar.png' },
  { id: 4, name: 'Toyota', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Toyota.png' },
  { id: 5, name: 'Indofood', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Indofood.png' },
  { id: 6, name: 'Astra Daihatsu', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Astra-Daihatsu.png' },
  { id: 7, name: 'Ibis Hotel', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Ibis-Hotel.png' },
  { id: 8, name: 'Rumah Sakit Siloam', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Siloam.png' },
  { id: 9, name: 'Rumah Sakit Haji', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Haji.png' },
  { id: 10, name: 'BNI', logo_url: 'https://bonekaku.co.id/wp-content/uploads/2019/09/BNI.png' }
];

const services = [
  {
    id: 1,
    title: 'Boneka Souvenir',
    slug: 'boneka-souvenir',
    description: 'Pembuatan aneka boneka souvenir untuk pernikahan, ulang tahun, gathering, dan promosi bisnis dalam jumlah banyak dengan harga bersahabat.',
    icon: 'gift'
  },
  {
    id: 2,
    title: 'Boneka Maskot & Badut',
    slug: 'boneka-maskot-badut',
    description: 'Maskot perusahaan, maskot instansi pemerintah, dan kostum badut berkualitas tinggi dengan bahan adem dan rangka ergonomis.',
    icon: 'user'
  },
  {
    id: 3,
    title: 'Bantal Custom',
    slug: 'bantal-custom',
    description: 'Bantal leher, bantal foto, bantal sofa promosi, dan bantal karakter unik dengan print sublim full color anti luntur.',
    icon: 'heart'
  },
  {
    id: 4,
    title: 'Bean Bag Berkualitas',
    slug: 'bean-bag-berkualitas',
    description: 'Bean bag santai berbagai ukuran dan motif cover, cocok untuk kafe, co-working space, kantor kekinian, maupun rumah pribadi.',
    icon: 'coffee'
  },
  {
    id: 5,
    title: 'Boneka Wisuda',
    slug: 'boneka-wisuda',
    description: 'Boneka wisuda lengkap dengan toga, selempang nama bordir, logo universitas, dan kemasan mika eksklusif.',
    icon: 'award'
  },
  {
    id: 6,
    title: 'Gantungan Kunci Boneka',
    slug: 'gantungan-kunci-boneka',
    description: 'Gantungan kunci mini plush dan aksesoris tas karakter dengan jahitan presisi dan gantungan besi anti karat.',
    icon: 'key'
  }
];

const settings = {
  site_title: 'Bonekaku – Pusat Souvenir dan Boneka Terlengkap',
  site_tagline: 'Semua tentang boneka bisa dibuat di sini',
  site_description: 'Pusat pembuatan souvenir boneka custom, bantal, maskot dan badut promosi terpercaya sejak 2018.',
  whatsapp_number: '6281385508611',
  whatsapp_number_2: '62817204188',
  email: 'marketingbonekaku@gmail.com',
  address_1: 'Jl. Katelia Raya Blok AS-3 No. 35, Jatisampurna, Bekasi, Jawa Barat 17433',
  address_2: 'Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi'
};

const articleComments = [
  {
    id: 1,
    article_slug: 'bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda',
    name: 'Dewi Fitriani',
    email_or_url: '',
    comment: 'Artikelnya sangat informatif dan membuka wawasan mengenai pemilihan jenis bahan bantal souvenir berkualitas.',
    is_admin: false,
    created_at: '2021-06-16 10:00:00'
  },
  {
    id: 2,
    article_slug: 'peranan-maskot-boneka-bagi-sebuah-perusahaan',
    name: 'Bonekaku Admin',
    email_or_url: 'https://bonekaku.co.id',
    comment: 'Terima kasih telah membaca. Kami siap membantu konsultasi desain 3D maskot untuk perusahaan Anda.',
    is_admin: true,
    created_at: '2021-05-20 08:30:00'
  }
];

const completeDataset = {
  categories,
  products,
  articles: articlesData,
  beanBagPrices,
  testimonials,
  clients,
  services,
  settings,
  articleComments
};

// Write JSON files
fs.writeFileSync(path.join(__dirname, 'dataset_complete.json'), JSON.stringify(completeDataset, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'backend', 'database', 'dataset_complete.json'), JSON.stringify(completeDataset, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'frontend', 'src', 'data', 'fallbackData.json'), JSON.stringify(completeDataset, null, 2), 'utf8');

console.log(`Generated complete JSON dataset: ${products.length} products, ${articlesData.length} full articles, ${categories.length} categories.`);

// Now generate SQL Dump
function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "''").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
}

let sql = `-- ============================================================
-- SQL DUMP: BONEKAKU DATABASE
-- Complete dataset extracted from boneka-ku.html
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB / cPanel phpMyAdmin
-- Generated: 2026-09-20
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ------------------------------------------------------------
-- Table: categories
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`categories\`;
CREATE TABLE \`categories\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`slug\` varchar(255) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`description\` text DEFAULT NULL,
  \`external_link\` varchar(255) DEFAULT NULL,
  \`sort_order\` int(11) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`categories_slug_unique\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`categories\` (\`id\`, \`slug\`, \`name\`, \`description\`, \`external_link\`, \`sort_order\`) VALUES
${categories.map(c => `(${c.id}, ${escapeSql(c.slug)}, ${escapeSql(c.name)}, ${escapeSql(c.description)}, ${escapeSql(c.external_link)}, ${c.sort_order})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`products\`;
CREATE TABLE \`products\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`category_id\` bigint(20) UNSIGNED NOT NULL,
  \`category_slug\` varchar(255) NOT NULL,
  \`tag\` varchar(255) DEFAULT NULL,
  \`name\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`image_url\` text NOT NULL,
  \`size\` varchar(100) DEFAULT NULL,
  \`price\` varchar(100) DEFAULT NULL,
  \`description\` text DEFAULT NULL,
  \`is_featured\` tinyint(1) NOT NULL DEFAULT 0,
  \`is_new\` tinyint(1) NOT NULL DEFAULT 0,
  \`sort_order\` int(11) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`products_slug_unique\` (\`slug\`),
  KEY \`products_category_id_foreign\` (\`category_id\`),
  KEY \`products_category_slug_index\` (\`category_slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`products\` (\`id\`, \`category_id\`, \`category_slug\`, \`tag\`, \`name\`, \`slug\`, \`image_url\`, \`size\`, \`price\`, \`description\`, \`is_featured\`, \`is_new\`, \`sort_order\`) VALUES
${products.map(p => `(${p.id}, ${p.category_id}, ${escapeSql(p.category_slug)}, ${escapeSql(p.tag)}, ${escapeSql(p.name)}, ${escapeSql(p.slug)}, ${escapeSql(p.image_url)}, ${escapeSql(p.size)}, ${escapeSql(p.price)}, ${escapeSql(p.description)}, ${p.is_featured ? 1 : 0}, ${p.is_new ? 1 : 0}, ${p.sort_order})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: articles
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`articles\`;
CREATE TABLE \`articles\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`original_url\` varchar(255) DEFAULT NULL,
  \`cover_image\` text DEFAULT NULL,
  \`date_formatted\` varchar(100) DEFAULT NULL,
  \`excerpt\` text DEFAULT NULL,
  \`content\` longtext DEFAULT NULL,
  \`author\` varchar(100) NOT NULL DEFAULT 'Bonekaku Admin',
  \`status\` varchar(50) NOT NULL DEFAULT 'published',
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`articles_slug_unique\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`articles\` (\`id\`, \`title\`, \`slug\`, \`original_url\`, \`cover_image\`, \`date_formatted\`, \`excerpt\`, \`content\`, \`author\`, \`status\`) VALUES
${articlesData.map(a => `(${a.id}, ${escapeSql(a.title)}, ${escapeSql(a.slug)}, ${escapeSql(a.original_url)}, ${escapeSql(a.cover_image)}, ${escapeSql(a.date_formatted)}, ${escapeSql(a.excerpt)}, ${escapeSql(a.content.trim())}, ${escapeSql(a.author)}, ${escapeSql(a.status)})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: article_comments
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`article_comments\`;
CREATE TABLE \`article_comments\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`article_slug\` varchar(255) NOT NULL,
  \`name\` varchar(100) NOT NULL,
  \`email_or_url\` varchar(255) DEFAULT NULL,
  \`comment\` text NOT NULL,
  \`is_admin\` tinyint(1) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`article_comments_article_slug_index\` (\`article_slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`article_comments\` (\`id\`, \`article_slug\`, \`name\`, \`email_or_url\`, \`comment\`, \`is_admin\`) VALUES
${articleComments.map(ac => `(${ac.id}, ${escapeSql(ac.article_slug)}, ${escapeSql(ac.name)}, ${escapeSql(ac.email_or_url)}, ${escapeSql(ac.comment)}, ${ac.is_admin ? 1 : 0})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: bean_bag_prices
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`bean_bag_prices\`;
CREATE TABLE \`bean_bag_prices\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`size_label\` varchar(100) NOT NULL,
  \`dimensions\` varchar(100) DEFAULT NULL,
  \`material\` varchar(255) DEFAULT NULL,
  \`price\` varchar(100) NOT NULL,
  \`is_popular\` tinyint(1) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`bean_bag_prices\` (\`id\`, \`size_label\`, \`dimensions\`, \`material\`, \`price\`, \`is_popular\`) VALUES
${beanBagPrices.map(b => `(${b.id}, ${escapeSql(b.size_label)}, ${escapeSql(b.dimensions)}, ${escapeSql(b.material)}, ${escapeSql(b.price)}, ${b.is_popular ? 1 : 0})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: testimonials
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`testimonials\`;
CREATE TABLE \`testimonials\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`role\` varchar(100) DEFAULT NULL,
  \`company\` varchar(100) DEFAULT NULL,
  \`avatar\` text DEFAULT NULL,
  \`quote\` text NOT NULL,
  \`rating\` int(11) NOT NULL DEFAULT 5,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`testimonials\` (\`id\`, \`name\`, \`role\`, \`company\`, \`avatar\`, \`quote\`, \`rating\`) VALUES
${testimonials.map(t => `(${t.id}, ${escapeSql(t.name)}, ${escapeSql(t.role)}, ${escapeSql(t.company)}, ${escapeSql(t.avatar)}, ${escapeSql(t.quote)}, ${t.rating})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: clients
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`clients\`;
CREATE TABLE \`clients\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`logo_url\` text NOT NULL,
  \`sort_order\` int(11) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`clients\` (\`id\`, \`name\`, \`logo_url\`, \`sort_order\`) VALUES
${clients.map(c => `(${c.id}, ${escapeSql(c.name)}, ${escapeSql(c.logo_url)}, ${c.id})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: services
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`services\`;
CREATE TABLE \`services\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`title\` varchar(100) NOT NULL,
  \`slug\` varchar(100) NOT NULL,
  \`description\` text DEFAULT NULL,
  \`icon\` varchar(100) DEFAULT NULL,
  \`image_url\` text DEFAULT NULL,
  \`sort_order\` int(11) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`services_slug_unique\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`services\` (\`id\`, \`title\`, \`slug\`, \`description\`, \`icon\`, \`sort_order\`) VALUES
${services.map(s => `(${s.id}, ${escapeSql(s.title)}, ${escapeSql(s.slug)}, ${escapeSql(s.description)}, ${escapeSql(s.icon)}, ${s.id})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: settings
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`settings\`;
CREATE TABLE \`settings\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`key\` varchar(255) NOT NULL,
  \`value\` longtext DEFAULT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`settings_key_unique\` (\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`settings\` (\`key\`, \`value\`) VALUES
${Object.entries(settings).map(([k, v]) => `(${escapeSql(k)}, ${escapeSql(v)})`).join(',\n')};

-- ------------------------------------------------------------
-- Table: contacts
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`contacts\`;
CREATE TABLE \`contacts\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`email\` varchar(255) DEFAULT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`subject\` varchar(255) DEFAULT NULL,
  \`message\` text NOT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
`;

if (!fs.existsSync(path.join(__dirname, 'database'))) {
  fs.mkdirSync(path.join(__dirname, 'database'), { recursive: true });
}

fs.writeFileSync(path.join(__dirname, 'database', 'bonekaku_complete.sql'), sql, 'utf8');
fs.writeFileSync(path.join(__dirname, 'backend', 'database', 'bonekaku_complete.sql'), sql, 'utf8');

console.log('Successfully generated database/bonekaku_complete.sql and backend/database/bonekaku_complete.sql');
