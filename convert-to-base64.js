const fs = require('fs');

const images = [
    'scene_01_a.png',
    'scene_01_b.png', 
    'scene_02_a.png',
    'scene_02_b.png',
    'scene_03_a.png',
    'scene_04_a.png',
    'scene_05_a.png',
    'character_01_a.png',
    'character_02_a.png'
];

const result = {};

console.log('🖼️ Converting images to base64...');

images.forEach(img => {
    try {
        const data = fs.readFileSync(img);
        const base64 = data.toString('base64');
        result[img] = `data:image/png;base64,${base64}`;
        console.log(`✅ Processed ${img} (${Math.round(data.length/1024)}KB)`);
    } catch(e) {
        console.log(`❌ Error with ${img}: ${e.message}`);
    }
});

fs.writeFileSync('images-base64.json', JSON.stringify(result, null, 2));
console.log(`📁 Saved ${Object.keys(result).length} images to images-base64.json`);
