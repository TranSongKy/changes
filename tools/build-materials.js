// Tạo materials/library-data.js từ các PDF trong thư mục materials/ và materials/inventory.json (nếu có).
// Chạy: npm run materials   (chạy lại mỗi khi thêm hoặc đổi tên file)
const fs = require("fs");
const path = require("path");
const M = require("../js/materials.js");

const DIR = path.join(__dirname, "..", "materials");

function walk(dir, rel = "") {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) return walk(path.join(dir, e.name), r);
    return /\.pdf$/i.test(e.name) ? [{ path: r, size: fs.statSync(path.join(dir, e.name)).size }] : [];
  });
}

const local = walk(DIR);
let inventory = [];
const invFile = path.join(DIR, "inventory.json");
if (fs.existsSync(invFile)) {
  try {
    inventory = JSON.parse(fs.readFileSync(invFile, "utf8"));
  } catch (e) {
    console.error("Không đọc được materials/inventory.json, bỏ qua link Drive.");
  }
}

const items = M.build(local, inventory);
if (!items.length) {
  console.error("Không tìm thấy PDF nào trong materials/. Hãy chép tài liệu vào đó rồi chạy lại.");
  process.exit(1);
}
fs.mkdirSync(DIR, { recursive: true });
const out = `// Tự tạo bởi tools/build-materials.js, đừng sửa tay. Không đưa file này lên GitHub.\nwindow.MATERIALS = ${JSON.stringify({ generated: new Date().toISOString(), items }, null, 1)};\n`;
fs.writeFileSync(path.join(DIR, "library-data.js"), out);

const byCat = {};
items.forEach((i) => (byCat[i.cat] = (byCat[i.cat] || 0) + 1));
console.log(`Đã ghi materials/library-data.js: ${items.length} tài liệu (${items.filter((i) => i.file).length} có trên máy, ${items.filter((i) => !i.file).length} chỉ có trên Drive).`);
console.log(Object.entries(byCat).map(([k, v]) => `  ${k}: ${v}`).join("\n"));
const other = items.filter((i) => i.cat === "other");
if (other.length) console.log("Chưa phân loại được:\n" + other.map((i) => "  " + i.title).join("\n"));
