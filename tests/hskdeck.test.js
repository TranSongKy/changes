const test = require("node:test");
const assert = require("node:assert");
const DECK = require("../js/hskdeck.js");

test("bộ thẻ HSK có số lượng hợp lý và chữ Hán không trùng", () => {
  assert.ok(DECK.length >= 250 && DECK.length <= 350, `số thẻ: ${DECK.length}`);
  const hs = DECK.map((w) => w.h);
  const dup = hs.filter((h, i) => hs.indexOf(h) !== i);
  assert.deepStrictEqual(dup, [], `trùng: ${dup.join(", ")}`);
});

test("mỗi thẻ có đủ chữ Hán, pinyin, nghĩa và cấp 1 hoặc 2", () => {
  for (const w of DECK) {
    for (const k of ["h", "p", "m"]) assert.ok(typeof w[k] === "string" && w[k].trim(), `${w.h}: thiếu ${k}`);
    assert.ok(w.l === 1 || w.l === 2, `${w.h}: cấp không hợp lệ`);
  }
});

test("chữ Hán chỉ gồm ký tự CJK, pinyin chỉ gồm chữ latinh có dấu thanh", () => {
  for (const w of DECK) {
    assert.match(w.h, /^[一-鿿…]+$/, `${w.h}: chữ Hán không hợp lệ`);
    assert.match(w.p.normalize("NFC"), /^[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙ' ]+$/, `${w.h}: pinyin "${w.p}" không hợp lệ`);
    if (w.ex !== undefined) assert.ok(typeof w.ex === "string" && w.ex.includes(w.h[0]), `${w.h}: câu ví dụ không hợp lệ`);
  }
});
