const fs = require('fs');
const path = require('path');

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

images.forEach(img => {
    const imgPath = path.join('.', img);
    if (fs.existsSync(imgPath)) {
        const data = fs.readFileSync(imgPath);
        const base64 = data.toString('base64');
        const ext = path.extname(img).slice(1);
        result[img] = `data:image/${ext};base64,${base64}`;
        console.log(`✅ Processed ${img}`);
    } else {
        console.log(`❌ Missing ${img}`);
    }
});

fs.writeFileSync('image-data.json', JSON.stringify(result, null, 2));
console.log('📁 Image data saved to image-data.json');
