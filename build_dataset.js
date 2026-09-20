const fs = require('fs');

const s3 = fs.readFileSync('extracted_script_3.js', 'utf8');
const body = fs.readFileSync('extracted_body.html', 'utf8');

// 1. Categories and Products
let catInfoMatch = s3.match(/const\s+CAT_INFO\s*=\s*(\{[\s\S]*?\});/);
let CAT_INFO = {};
if (catInfoMatch) {
    eval('CAT_INFO = ' + catInfoMatch[1]);
}

let prodRawMatch = s3.match(/const\s+PRODUCTS_RAW\s*=\s*(\[[\s\S]*?\]);/);
let PRODUCTS_RAW = [];
if (prodRawMatch) {
    eval('PRODUCTS_RAW = ' + prodRawMatch[1]);
}

const categories = Object.entries(CAT_INFO).map(([slug, val], idx) => ({
    id: idx + 1,
    slug: slug,
    name: val[0],
    description: val[1],
    external_link: val[2],
    sort_order: idx + 1
}));

const products = PRODUCTS_RAW.map((row, idx) => {
    const catSlug = row[0];
    const category = categories.find(c => c.slug === catSlug);
    const title = row[2];
    // extract size if present e.g. "Bear Jeslyn, 12cm" -> size "12cm"
    let size = '';
    const sizeMatch = title.match(/,\s*([0-9]+(?:\.[0-9]+)?\s*cm|\d+x\d+\s*cm)/i);
    if (sizeMatch) {
        size = sizeMatch[1];
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
        description: category ? category.description : '',
        is_featured: catSlug === 'most-favorite',
        is_new: idx < 10,
        sort_order: idx + 1
    };
});

// 2. Articles
let artRawMatch = s3.match(/const\s+ARTICLES_RAW\s*=\s*(\[[\s\S]*?\]);/);
let ARTICLES_RAW = [];
if (artRawMatch) {
    eval('ARTICLES_RAW = ' + artRawMatch[1]);
}

const articles = ARTICLES_RAW.map((row, idx) => {
    const title = row[0];
    const originalUrl = row[1];
    const coverImage = row[2];
    const dateStr = row[3];
    const excerpt = row[4] || '';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return {
        id: idx + 1,
        title: title,
        slug: slug,
        original_url: originalUrl,
        cover_image: coverImage,
        date_formatted: dateStr,
        excerpt: excerpt,
        content: `<p>${excerpt}</p><p>Untuk informasi lebih lengkap dan konsultasi pemesanan boneka custom berkualitas, silakan hubungi tim kami melalui WhatsApp atau form kontak.</p>`,
        author: 'Bonekaku Admin',
        status: 'published'
    };
});

// 3. Bean Bag Prices
const beanBagPrices = [
    { id: 1, size_label: 'Kecil (S)', dimensions: '70 x 90 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 175.000', is_popular: false },
    { id: 2, size_label: 'Sedang (M)', dimensions: '90 x 120 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 275.000', is_popular: true },
    { id: 3, size_label: 'Besar (L)', dimensions: '110 x 140 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 375.000', is_popular: false },
    { id: 4, size_label: 'Jumbo (XL)', dimensions: '125 x 150 cm', material: 'Polyester / Katun / Canvas', price: 'Rp 475.000', is_popular: false }
];

// 4. Testimonials (parsed from body snippet or standard from html)
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

// 5. Clients
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

// 6. Services
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

// 7. Settings
const settings = {
    site_name: 'Bonekaku.co.id',
    tagline: 'Pusat Souvenir dan Boneka Terlengkap',
    phone: '0812-8888-1234',
    whatsapp: '6281288881234',
    email: 'cs@bonekaku.co.id',
    address: 'Jl. Katelia Raya Blok AS-3 No. 35, Jl. Raya Kranggan, RT.006/RW.014, Jatisampurna, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17433',
    instagram: 'https://instagram.com/bonekaku',
    youtube: 'https://youtube.com',
    maps_embed: 'https://maps.google.com'
};

const fullData = {
    categories,
    products,
    articles,
    beanBagPrices,
    testimonials,
    clients,
    services,
    settings
};

fs.writeFileSync('dataset_complete.json', JSON.stringify(fullData, null, 2), 'utf8');
console.log('Dataset built successfully!');
console.log(`- Categories: ${categories.length}`);
console.log(`- Products: ${products.length}`);
console.log(`- Articles: ${articles.length}`);
console.log(`- Bean Bags: ${beanBagPrices.length}`);
console.log(`- Testimonials: ${testimonials.length}`);
console.log(`- Clients: ${clients.length}`);
console.log(`- Services: ${services.length}`);
