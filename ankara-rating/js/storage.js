// LocalStorage Yönetimi
const STORAGE_KEY = "ankara_rating_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { yorumlar: {}, puanlar: {} };
  } catch (e) {
    return { yorumlar: {}, puanlar: {} };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getYorumlar(locationId) {
  const data = loadData();
  return data.yorumlar[locationId] || [];
}

function addYorum(locationId, yorum) {
  const data = loadData();
  if (!data.yorumlar[locationId]) data.yorumlar[locationId] = [];
  const newYorum = {
    id: Date.now(),
    ...yorum,
    tarih: new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }),
    timestamp: Date.now()
  };
  data.yorumlar[locationId].unshift(newYorum);
  saveData(data);
  return newYorum;
}

function deleteYorum(locationId, yorumId) {
  const data = loadData();
  if (data.yorumlar[locationId]) {
    data.yorumlar[locationId] = data.yorumlar[locationId].filter(y => y.id !== yorumId);
    saveData(data);
  }
}

function getPuanlar(locationId) {
  const data = loadData();
  return data.puanlar[locationId] || {};
}

function addPuan(locationId, kategoriler) {
  const data = loadData();
  if (!data.puanlar[locationId]) data.puanlar[locationId] = { puanlama: [], count: 0 };
  data.puanlar[locationId].puanlama.push({ ...kategoriler, timestamp: Date.now() });
  data.puanlar[locationId].count++;
  saveData(data);
}

function getOrtalamaPuan(locationId) {
  const data = loadData();
  const p = data.puanlar[locationId];
  if (!p || !p.puanlama || p.puanlama.length === 0) return null;

  const totals = {};
  const counts = {};
  p.puanlama.forEach(entry => {
    Object.keys(entry).forEach(k => {
      if (k !== "timestamp" && typeof entry[k] === "number") {
        totals[k] = (totals[k] || 0) + entry[k];
        counts[k] = (counts[k] || 0) + 1;
      }
    });
  });

  const averages = {};
  Object.keys(totals).forEach(k => {
    averages[k] = (totals[k] / counts[k]).toFixed(1);
  });
  averages._count = p.puanlama.length;
  return averages;
}

function getGenel(locationId) {
  const ort = getOrtalamaPuan(locationId);
  if (!ort) return null;
  const vals = Object.keys(ort)
    .filter(k => k !== "_count" && !isNaN(parseFloat(ort[k])))
    .map(k => parseFloat(ort[k]));
  if (vals.length === 0) return null;
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}
