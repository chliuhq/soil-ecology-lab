const n = require('E:/Claude/Github_SoilEcoloy/soil-ecology-lab/src/data/news.json');
const item = n.find(x => x.id === '2026-04-08-pingxiang-fieldwork');
const r = item.content.zh;
console.log('样地标志牌:', r.includes('样地标志牌'));
console.log('样地照片:', r.includes('样地照片'));
console.log('土壤剖面:', r.includes('土壤剖面'));
console.log('Images count:', (r.match(/!\[/g) || []).length);
