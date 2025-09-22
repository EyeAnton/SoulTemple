const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

// ImgBB API key (free tier allows 32MB per image)
const IMGBB_API_KEY = 'your-api-key-here'; // You'll need to get this from https://api.imgbb.com/

const imagesDir = path.join(__dirname, 'images');
const uploadDir = path.join(imagesDir, 'upload');

// Image mapping for the game
const imageMap = {
  'scene_01_a': 'scene_01_a.png',
  'scene_01_b': 'scene_01_b.png', 
  'scene_02_a': 'scene_02_a.png',
  'scene_02_b': 'scene_02_b.png',
  'scene_03_a': 'scene_03_a.png',
  'scene_04_a': 'scene_04_a.png',
  'scene_05_a': 'scene_05_a.png',
  'character_01_a': 'character_01_a.png',
  'character_02_a': 'character_02_a.png'
};

async function uploadImage(imagePath, imageName) {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('key', IMGBB_API_KEY);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders()
    });

    if (response.data.success) {
      return {
        name: imageName,
        url: response.data.data.url,
        deleteUrl: response.data.data.delete_url
      };
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error(`Error uploading ${imageName}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('Starting image upload process...');
  
  const results = {};
  
  for (const [gameKey, fileName] of Object.entries(imageMap)) {
    const imagePath = path.join(uploadDir, fileName);
    
    if (fs.existsSync(imagePath)) {
      console.log(`Uploading ${fileName}...`);
      const result = await uploadImage(imagePath, fileName);
      
      if (result) {
        results[gameKey] = result.url;
        console.log(`✅ ${fileName} uploaded successfully`);
      } else {
        console.log(`❌ Failed to upload ${fileName}`);
      }
    } else {
      console.log(`⚠️  File not found: ${fileName}`);
    }
  }
  
  // Save results to a JSON file
  fs.writeFileSync(
    path.join(__dirname, 'image-urls.json'), 
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n📋 Upload Results:');
  console.log(JSON.stringify(results, null, 2));
  
  console.log('\n✅ Image URLs saved to image-urls.json');
  console.log('Copy these URLs to your App.tsx file to replace the getImagePath function');
}

// Run the upload process
uploadAllImages().catch(console.error);
