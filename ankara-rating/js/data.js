// Ankara Mahalle Puanlama Uygulaması - Veri Katmanı
const ANKARA_DATA = {
  ilceler: [
    {
      id: "cankaya",
      ad: "Çankaya",
      aciklama: "Ankara'nın merkezi ilçesi, idari ve kültürel merkez",
      img: "🏛️",
      mahalleler: [
        { id: "bahcelievler", ad: "Bahçelievler", tip: "mahalle", ilce: "cankaya" },
        { id: "gaziosmanpasa", ad: "Gaziosmanpaşa", tip: "mahalle", ilce: "cankaya" },
        { id: "kavaklidere", ad: "Kavaklıdere", tip: "mahalle", ilce: "cankaya" },
        { id: "kizilay", ad: "Kızılay", tip: "mahalle", ilce: "cankaya" },
        { id: "cukurambar", ad: "Çukurambar", tip: "mahalle", ilce: "cankaya" },
        { id: "balgat", ad: "Balgat", tip: "mahalle", ilce: "cankaya" },
        { id: "emek", ad: "Emek", tip: "mahalle", ilce: "cankaya" },
        { id: "ayranci", ad: "Ayrancı", tip: "mahalle", ilce: "cankaya" },
        { id: "mebusevleri", ad: "Mebusevleri", tip: "mahalle", ilce: "cankaya" },
        { id: "oran", ad: "Oran", tip: "mahalle", ilce: "cankaya" }
      ]
    },
    {
      id: "kecioren",
      ad: "Keçiören",
      aciklama: "Kuzey Ankara'nın en kalabalık ilçesi",
      img: "🏘️",
      mahalleler: [
        { id: "etlik", ad: "Etlik", tip: "mahalle", ilce: "kecioren" },
        { id: "baglum", ad: "Bağlum", tip: "mahalle", ilce: "kecioren" },
        { id: "oğuzlar", ad: "Oğuzlar", tip: "mahalle", ilce: "kecioren" },
        { id: "subayevleri", ad: "Subayevleri", tip: "mahalle", ilce: "kecioren" },
        { id: "gulveren", ad: "Gülveren", tip: "mahalle", ilce: "kecioren" },
        { id: "aşağı_eglence", ad: "Aşağı Eğlence", tip: "mahalle", ilce: "kecioren" },
        { id: "atapark", ad: "Atapark", tip: "mahalle", ilce: "kecioren" },
        { id: "pursaklar_mah", ad: "Pursaklar Mah.", tip: "mahalle", ilce: "kecioren" }
      ]
    },
    {
      id: "mamak",
      ad: "Mamak",
      aciklama: "Doğu Ankara'nın köklü ilçesi",
      img: "🌆",
      mahalleler: [
        { id: "karapinar", ad: "Karapınar", tip: "mahalle", ilce: "mamak" },
        { id: "hüseyingazi", ad: "Hüseyingazi", tip: "mahalle", ilce: "mamak" },
        { id: "tuzluçayır", ad: "Tuzluçayır", tip: "mahalle", ilce: "mamak" },
        { id: "dustupa", ad: "Dumlupınar", tip: "mahalle", ilce: "mamak" },
        { id: "yenidogan", ad: "Yenidoğan", tip: "mahalle", ilce: "mamak" }
      ]
    },
    {
      id: "altindag",
      ad: "Altındağ",
      aciklama: "Tarihi Ankara kalesi ve çevresinin ilçesi",
      img: "🏰",
      mahalleler: [
        { id: "ulus", ad: "Ulus", tip: "mahalle", ilce: "altindag" },
        { id: "ankarakalesi", ad: "Ankara Kalesi", tip: "mahalle", ilce: "altindag" },
        { id: "hamamonu", ad: "Hamamönü", tip: "mahalle", ilce: "altindag" },
        { id: "samanpazari", ad: "Samanpazarı", tip: "mahalle", ilce: "altindag" },
        { id: "kurtulus", ad: "Kurtuluş", tip: "mahalle", ilce: "altindag" }
      ]
    },
    {
      id: "yenimahalle",
      ad: "Yenimahalle",
      aciklama: "Batı Ankara'nın gelişen ilçesi",
      img: "🌇",
      mahalleler: [
        { id: "batikent", ad: "Batıkent", tip: "mahalle", ilce: "yenimahalle" },
        { id: "demetevler", ad: "Demetevler", tip: "mahalle", ilce: "yenimahalle" },
        { id: "macunköy", ad: "Macunköy", tip: "mahalle", ilce: "yenimahalle" },
        { id: "ostim", ad: "OSTİM", tip: "mahalle", ilce: "yenimahalle" },
        { id: "akköprü", ad: "Akköprü", tip: "mahalle", ilce: "yenimahalle" },
        { id: "yenimahalle_mah", ad: "Yenimahalle Mah.", tip: "mahalle", ilce: "yenimahalle" }
      ]
    },
    {
      id: "etimesgut",
      ad: "Etimesgut",
      aciklama: "Batı Ankara'nın hızla büyüyen ilçesi",
      img: "🏗️",
      mahalleler: [
        { id: "elvankent", ad: "Elvankent", tip: "mahalle", ilce: "etimesgut" },
        { id: "yapracik", ad: "Yapracık", tip: "mahalle", ilce: "etimesgut" },
        { id: "piyangotepe", ad: "Piyangotepe", tip: "mahalle", ilce: "etimesgut" },
        { id: "etimesgut_mah", ad: "Etimesgut Mah.", tip: "mahalle", ilce: "etimesgut" }
      ]
    },
    {
      id: "sincan",
      ad: "Sincan",
      aciklama: "Kuzeybatı Ankara'nın sanayi ilçesi",
      img: "🏭",
      mahalleler: [
        { id: "sincan_mah", ad: "Sincan Mah.", tip: "mahalle", ilce: "sincan" },
        { id: "osmaniye", ad: "Osmaniye", tip: "mahalle", ilce: "sincan" },
        { id: "pınarbaşı", ad: "Pınarbaşı", tip: "mahalle", ilce: "sincan" }
      ]
    },
    {
      id: "golbasi",
      ad: "Gölbaşı",
      aciklama: "Güney Ankara'nın doğa ile iç içe ilçesi",
      img: "🌊",
      mahalleler: [
        { id: "golbasi_mah", ad: "Gölbaşı Mah.", tip: "mahalle", ilce: "golbasi" },
        { id: "incek", ad: "İncek", tip: "mahalle", ilce: "golbasi" },
        { id: "tulumtaş", ad: "Tulumtaş", tip: "mahalle", ilce: "golbasi" }
      ]
    }
  ],

  // Sokaklar (Streets) - her mahalle için örnek sokaklar
  sokaklar: [
    { id: "ataturk_cd_cankaya", ad: "Atatürk Caddesi", tip: "sokak", mahalleId: "kizilay", ilce: "cankaya" },
    { id: "tunali_hilmi_cd", ad: "Tunalı Hilmi Caddesi", tip: "sokak", mahalleId: "kavaklidere", ilce: "cankaya" },
    { id: "baris_manco_cd", ad: "Barış Manço Caddesi", tip: "sokak", mahalleId: "balgat", ilce: "cankaya" },
    { id: "mevlana_cd", ad: "Mevlana Caddesi", tip: "sokak", mahalleId: "ulus", ilce: "altindag" },
    { id: "anafartalar_cd", ad: "Anafartalar Caddesi", tip: "sokak", mahalleId: "ulus", ilce: "altindag" },
    { id: "mithatpasa_cd", ad: "Mithatpaşa Caddesi", tip: "sokak", mahalleId: "kizilay", ilce: "cankaya" },
    { id: "ugur_mumcu_cd", ad: "Uğur Mumcu Caddesi", tip: "sokak", mahalleId: "gaziosmanpasa", ilce: "cankaya" },
    { id: "filistin_sk", ad: "Filistin Sokak", tip: "sokak", mahalleId: "gaziosmanpasa", ilce: "cankaya" },
    { id: "iran_cd", ad: "İran Caddesi", tip: "sokak", mahalleId: "kavaklidere", ilce: "cankaya" },
    { id: "selanik_cd", ad: "Selanik Caddesi", tip: "sokak", mahalleId: "kizilay", ilce: "cankaya" },
    { id: "menekse_sk", ad: "Menekşe Sokak", tip: "sokak", mahalleId: "bahcelievler", ilce: "cankaya" },
    { id: "ziya_gokalp_cd", ad: "Ziya Gökalp Caddesi", tip: "sokak", mahalleId: "kizilay", ilce: "cankaya" },
    { id: "batikent_cd", ad: "Batıkent Caddesi", tip: "sokak", mahalleId: "batikent", ilce: "yenimahalle" },
    { id: "demetevler_cd", ad: "Demetevler Caddesi", tip: "sokak", mahalleId: "demetevler", ilce: "yenimahalle" },
    { id: "etlik_cd", ad: "Etlik Caddesi", tip: "sokak", mahalleId: "etlik", ilce: "kecioren" }
  ],

  // Apartmanlar
  apartmanlar: [
    { id: "konak_apt", ad: "Konak Apartmanı", tip: "apartman", mahalleId: "kavaklidere", ilce: "cankaya", adres: "Tunalı Hilmi Cad. No:12" },
    { id: "yildiz_apt", ad: "Yıldız Apartmanı", tip: "apartman", mahalleId: "gaziosmanpasa", ilce: "cankaya", adres: "Uğur Mumcu Cad. No:5" },
    { id: "lale_apt", ad: "Lale Apartmanı", tip: "apartman", mahalleId: "bahcelievler", ilce: "cankaya", adres: "Menekşe Sok. No:8" },
    { id: "guneş_apt", ad: "Güneş Apartmanı", tip: "apartman", mahalleId: "emek", ilce: "cankaya", adres: "Emek Mah. 8. Cad. No:15" },
    { id: "prestij_apt", ad: "Prestij Apartmanı", tip: "apartman", mahalleId: "balgat", ilce: "cankaya", adres: "Balgat Cad. No:22" },
    { id: "atlas_apt", ad: "Atlas Apartmanı", tip: "apartman", mahalleId: "kizilay", ilce: "cankaya", adres: "Selanik Cad. No:3" },
    { id: "marmara_apt", ad: "Marmara Apartmanı", tip: "apartman", mahalleId: "ayranci", ilce: "cankaya", adres: "Ayrancı Mah. 1424 Sok. No:7" },
    { id: "bahar_apt", ad: "Bahar Apartmanı", tip: "apartman", mahalleId: "etlik", ilce: "kecioren", adres: "Etlik Cad. No:44" },
    { id: "deniz_apt", ad: "Deniz Apartmanı", tip: "apartman", mahalleId: "batikent", ilce: "yenimahalle", adres: "Batıkent 4. Etap C Blok" },
    { id: "yesil_apt", ad: "Yeşil Apartman", tip: "apartman", mahalleId: "ulus", ilce: "altindag", adres: "Anafartalar Cad. No:67" }
  ],

  // Siteler (Residential Complexes)
  siteler: [
    { id: "incek_loft", ad: "İncek Loft Sitesi", tip: "site", mahalleId: "incek", ilce: "golbasi", adres: "İncek Mah. Loft Blokları" },
    { id: "angora_evleri", ad: "Angora Evleri", tip: "site", mahalleId: "incek", ilce: "golbasi", adres: "İncek Mah. Angora Cad." },
    { id: "cukurambar_park", ad: "Çukurambar Park Sitesi", tip: "site", mahalleId: "cukurambar", ilce: "cankaya", adres: "Çukurambar Mah." },
    { id: "oran_sitesi", ad: "Oran Sitesi", tip: "site", mahalleId: "oran", ilce: "cankaya", adres: "Oran Mah. 1. Etap" },
    { id: "batikent_sitesi", ad: "Batıkent Kooperatif Evleri", tip: "site", mahalleId: "batikent", ilce: "yenimahalle", adres: "Batıkent 5. Etap" },
    { id: "elvankent_sitesi", ad: "Elvankent Sitesi", tip: "site", mahalleId: "elvankent", ilce: "etimesgut", adres: "Elvankent Mah. 3. Etap" },
    { id: "yaşamkent", ad: "Yaşamkent Sitesi", tip: "site", mahalleId: "incek", ilce: "golbasi", adres: "Yaşamkent Mah." },
    { id: "mesa_koru", ad: "Mesa Koru Sitesi", tip: "site", mahalleId: "oran", ilce: "cankaya", adres: "Oran Mah. Koru Evleri" },
    { id: "baris_sitesi", ad: "Barış Sitesi", tip: "site", mahalleId: "demetevler", ilce: "yenimahalle", adres: "Demetevler 4. Cad." },
    { id: "gordion_sitesi", ad: "Gordion Sitesi", tip: "site", mahalleId: "macunköy", ilce: "yenimahalle", adres: "Macunköy Mah. Gordion Blokları" }
  ]
};

// Tüm lokasyonları düzleştirilmiş listede döndür
function getAllLocations() {
  const all = [];
  ANKARA_DATA.ilceler.forEach(ilce => {
    ilce.mahalleler.forEach(mah => {
      all.push({ ...mah, ilceAd: ilce.ad });
    });
  });
  ANKARA_DATA.sokaklar.forEach(sokak => {
    const ilce = ANKARA_DATA.ilceler.find(i => i.id === sokak.ilce);
    const mah = ilce?.mahalleler.find(m => m.id === sokak.mahalleId);
    all.push({ ...sokak, ilceAd: ilce?.ad || "", mahalleAd: mah?.ad || "" });
  });
  ANKARA_DATA.apartmanlar.forEach(apt => {
    const ilce = ANKARA_DATA.ilceler.find(i => i.id === apt.ilce);
    const mah = ilce?.mahalleler.find(m => m.id === apt.mahalleId);
    all.push({ ...apt, ilceAd: ilce?.ad || "", mahalleAd: mah?.ad || "" });
  });
  ANKARA_DATA.siteler.forEach(site => {
    const ilce = ANKARA_DATA.ilceler.find(i => i.id === site.ilce);
    const mah = ilce?.mahalleler.find(m => m.id === site.mahalleId);
    all.push({ ...site, ilceAd: ilce?.ad || "", mahalleAd: mah?.ad || "" });
  });
  return all;
}

function getLocationById(id) {
  return getAllLocations().find(l => l.id === id) || null;
}

function getLocationsByIlce(ilceId) {
  return getAllLocations().filter(l => l.ilce === ilceId);
}

function searchLocations(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getAllLocations();
  return getAllLocations().filter(l =>
    l.ad.toLowerCase().includes(q) ||
    (l.ilceAd || "").toLowerCase().includes(q) ||
    (l.mahalleAd || "").toLowerCase().includes(q) ||
    (l.adres || "").toLowerCase().includes(q)
  );
}

const TIP_LABELS = {
  mahalle: { label: "Mahalle", icon: "🏘️", color: "#4CAF50" },
  sokak: { label: "Sokak/Cadde", icon: "🛤️", color: "#2196F3" },
  apartman: { label: "Apartman", icon: "🏢", color: "#FF9800" },
  site: { label: "Site", icon: "🏙️", color: "#9C27B0" }
};

const RATING_KATEGORILER = [
  { id: "genel", label: "Genel", icon: "⭐" },
  { id: "guvenlik", label: "Güvenlik", icon: "🔒" },
  { id: "temizlik", label: "Temizlik", icon: "✨" },
  { id: "ulasim", label: "Ulaşım", icon: "🚌" },
  { id: "gurultu", label: "Sessizlik", icon: "🔇" },
  { id: "sosyal", label: "Sosyal İmkanlar", icon: "🎭" }
];
