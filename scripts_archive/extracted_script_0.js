
/* Bonekaku — komentar artikel (dibagikan ke semua pengunjung).
   Sumber kode ini publik; jangan menaruh rahasia di sini.

   Tata letak byte durabel (versi 1):
     [0]      uint8   versi
     [1..4]   uint32  jumlah komentar (little-endian)
     [5..8]   uint32  offset tulis berikutnya (little-endian)
     lalu `jumlah komentar` record berurutan:
       uint16 panjangSlug + slug (utf8)
       uint16 panjangNama + nama (utf8)
       uint16 panjangUrl + url (utf8)
       uint16 panjangTeks + teks (utf8)
       float64 ts (milidetik epoch)
*/
const ADC_VERSION = 1;
const ADC_HEADER = 9;
const ADC_MAX_COMMENTS = 3000;
const ADC_MAX_SLUG = 120;
const ADC_MAX_NAME = 60;
const ADC_MAX_URL = 200;
const ADC_MAX_TEXT = 1200;
const ADC_TOPIC = "artikel-komentar:";

const adcView = new DataView(state.buffer, state.byteOffset, state.byteLength);
const adcConnSlug = new Map();
const adcLastPost = new Map();
const adcWindow = new Map();

function adcU8(o) { return adcView.getUint8(o); }
function adcU16(o) { return adcView.getUint16(o, true); }
function adcU32(o) { return adcView.getUint32(o, true); }
function adcSetU8(o, v) { adcView.setUint8(o, v); }
function adcSetU16(o, v) { adcView.setUint16(o, v, true); }
function adcSetU32(o, v) { adcView.setUint32(o, v, true); }

function adcEncode(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
    else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < str.length) {
      const c2 = str.charCodeAt(i + 1);
      if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
        const cp = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
        out.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
        i++;
      } else out.push(0xEF, 0xBF, 0xBD);
    } else if (c >= 0xD800 && c <= 0xDFFF) out.push(0xEF, 0xBF, 0xBD);
    else out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return Uint8Array.from(out);
}

function adcDecode(start, end) {
  let s = "";
  let i = start;
  while (i < end) {
    const b = state[i++];
    if (b < 0x80) s += String.fromCharCode(b);
    else if (b < 0xE0) s += String.fromCharCode(((b & 31) << 6) | (state[i++] & 63));
    else if (b < 0xF0) {
      const b2 = state[i++] & 63, b3 = state[i++] & 63;
      s += String.fromCharCode(((b & 15) << 12) | (b2 << 6) | b3);
    } else {
      const b2 = state[i++] & 63, b3 = state[i++] & 63, b4 = state[i++] & 63;
      const cp = ((b & 7) << 18) | (b2 << 12) | (b3 << 6) | b4;
      const off = cp - 0x10000;
      s += String.fromCharCode(0xD800 + (off >> 10), 0xDC00 + (off & 1023));
    }
  }
  return s;
}

if (adcU8(0) !== ADC_VERSION) {
  adcSetU8(0, ADC_VERSION);
  adcSetU32(1, 0);
  adcSetU32(5, ADC_HEADER);
}

function adcListFor(slug) {
  const out = [];
  const count = adcU32(1);
  let o = ADC_HEADER;
  for (let i = 0; i < count; i++) {
    if (o + 2 > state.length) break;
    const sl = adcU16(o); o += 2; const s = adcDecode(o, o + sl); o += sl;
    const nl = adcU16(o); o += 2; const n = adcDecode(o, o + nl); o += nl;
    const ul = adcU16(o); o += 2; const u = adcDecode(o, o + ul); o += ul;
    const tl = adcU16(o); o += 2; const t = adcDecode(o, o + tl); o += tl;
    const ts = adcView.getFloat64(o, true); o += 8;
    if (s === slug) out.push({ n: n, u: u, t: t, ts: ts });
  }
  return out;
}

function adcAppend(slug, name, url, text, ts) {
  const sb = adcEncode(slug), nb = adcEncode(name), ub = adcEncode(url), tb = adcEncode(text);
  const need = 2 + sb.length + 2 + nb.length + 2 + ub.length + 2 + tb.length + 8;
  const count = adcU32(1);
  let o = adcU32(5);
  if (count >= ADC_MAX_COMMENTS || o + need > state.length) return false;
  adcSetU16(o, sb.length); o += 2; state.set(sb, o); o += sb.length;
  adcSetU16(o, nb.length); o += 2; state.set(nb, o); o += nb.length;
  adcSetU16(o, ub.length); o += 2; state.set(ub, o); o += ub.length;
  adcSetU16(o, tb.length); o += 2; state.set(tb, o); o += tb.length;
  adcView.setFloat64(o, ts, true); o += 8;
  adcSetU32(1, count + 1);
  adcSetU32(5, o);
  return true;
}

function adcNet(conn, i) {
  const net = conn && conn.net;
  return net && typeof net[i] === "number" ? net[i] : 0;
}

function adcWait(conn) {
  const now = Date.now();
  const k3 = adcNet(conn, 3), k1 = adcNet(conn, 1);
  if (now - (adcLastPost.get(k3) || 0) < 12000) return "Tunggu beberapa detik sebelum mengirim komentar lagi.";
  let arr = (adcWindow.get(k1) || []).filter(function (t) { return now - t < 3600000; });
  const limit = conn && conn.isProxy ? 6 : 15;
  if (arr.length >= limit) return "Terlalu banyak komentar dari jaringan ini. Silakan coba lagi nanti.";
  arr.push(now);
  adcWindow.set(k1, arr);
  adcLastPost.set(k3, now);
  return null;
}

self.onmessage = function (msg) {
  const conn = msg.conn, data = msg.data;
  if (typeof data !== "string") return;
  let m;
  try { m = JSON.parse(data); } catch (e) { return; }
  if (!m || m.t !== "sub" || typeof m.slug !== "string") return;
  const slug = m.slug.slice(0, ADC_MAX_SLUG);
  const prev = adcConnSlug.get(conn.id);
  if (prev && prev !== slug) conn.unsubscribe(ADC_TOPIC + prev);
  adcConnSlug.set(conn.id, slug);
  conn.subscribe(ADC_TOPIC + slug);
};

self.onclose = function (msg) {
  adcConnSlug.delete(msg.conn.id);
};

self.rpc = {
  commentsList: function (msg, slug) {
    if (typeof slug !== "string") return "[]";
    return JSON.stringify(adcListFor(slug.slice(0, ADC_MAX_SLUG)));
  },
  commentsPost: function (msg, payload) {
    let m;
    try { m = JSON.parse(payload); } catch (e) { return JSON.stringify({ ok: false, error: "Data komentar tidak valid." }); }
    const slug = String(m.slug || "").slice(0, ADC_MAX_SLUG);
    const name = String(m.name || "").trim().slice(0, ADC_MAX_NAME);
    const url = String(m.url || "").trim().slice(0, ADC_MAX_URL);
    const text = String(m.text || "").trim().slice(0, ADC_MAX_TEXT);
    if (!slug || !name || !text) return JSON.stringify({ ok: false, error: "Nama dan komentar wajib diisi." });
    if (url && !/^https?:\/\//i.test(url)) return JSON.stringify({ ok: false, error: "Alamat website harus diawali http:// atau https://." });
    if ((text.match(/https?:\/\//gi) || []).length > 3) return JSON.stringify({ ok: false, error: "Komentar berisi terlalu banyak tautan." });
    const wait = adcWait(msg.conn);
    if (wait) return JSON.stringify({ ok: false, error: wait });
    const ts = Date.now();
    if (!adcAppend(slug, name, url, text, ts)) return JSON.stringify({ ok: false, error: "Penyimpanan komentar sudah penuh." });
    const comment = { n: name, u: url, t: text, ts: ts };
    pubsub.publish(ADC_TOPIC + slug, JSON.stringify({ t: "c", slug: slug, comment: comment }));
    return JSON.stringify({ ok: true, comment: comment });
  }
};
