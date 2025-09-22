const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Храм Души Game...\n');

// Test 1: Check if index.html exists and is readable
console.log('1. Checking index.html file...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    console.log('✅ index.html exists and is readable');
    console.log(`   File size: ${htmlContent.length} characters`);
} catch (error) {
    console.log('❌ Error reading index.html:', error.message);
    process.exit(1);
}

// Test 2: Check for game data structure
console.log('\n2. Checking game data structure...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for gameData array
    if (htmlContent.includes('const gameData = [')) {
        console.log('✅ Game data array found');
    } else {
        console.log('❌ Game data array not found');
    }
    
    // Check for gradient backgrounds
    if (htmlContent.includes('linear-gradient')) {
        console.log('✅ Gradient backgrounds found');
        const gradientMatches = htmlContent.match(/linear-gradient\([^)]+\)/g);
        console.log(`   Found ${gradientMatches ? gradientMatches.length : 0} gradient definitions`);
    } else {
        console.log('❌ No gradient backgrounds found');
    }
    
    // Check for character emojis
    if (htmlContent.includes('👤') || htmlContent.includes('✨') || htmlContent.includes('💫')) {
        console.log('✅ Character emojis found');
    } else {
        console.log('❌ No character emojis found');
    }
    
} catch (error) {
    console.log('❌ Error analyzing HTML content:', error.message);
}

// Test 3: Check for JavaScript functions
console.log('\n3. Checking JavaScript functions...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    const requiredFunctions = [
        'updateDisplay',
        'startGame',
        'handleChoice',
        'nextStep',
        'nextScene'
    ];
    
    requiredFunctions.forEach(func => {
        if (htmlContent.includes(`function ${func}`)) {
            console.log(`✅ Function ${func} found`);
        } else {
            console.log(`❌ Function ${func} missing`);
        }
    });
    
} catch (error) {
    console.log('❌ Error checking functions:', error.message);
}

// Test 4: Check for CSS styles
console.log('\n4. Checking CSS styles...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    const requiredStyles = [
        '.background-image',
        '.scene-title',
        '.narrator-paragraph',
        '.choice-button',
        '.character-container'
    ];
    
    requiredStyles.forEach(style => {
        if (htmlContent.includes(style)) {
            console.log(`✅ CSS class ${style} found`);
        } else {
            console.log(`❌ CSS class ${style} missing`);
        }
    });
    
} catch (error) {
    console.log('❌ Error checking CSS:', error.message);
}

// Test 5: Check for mobile responsiveness
console.log('\n5. Checking mobile responsiveness...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    if (htmlContent.includes('@media')) {
        console.log('✅ Media queries found for responsive design');
    } else {
        console.log('❌ No media queries found');
    }
    
    if (htmlContent.includes('viewport')) {
        console.log('✅ Viewport meta tag found');
    } else {
        console.log('❌ No viewport meta tag found');
    }
    
} catch (error) {
    console.log('❌ Error checking responsiveness:', error.message);
}

// Test 6: Check for potential issues
console.log('\n6. Checking for potential issues...');
try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for console.log statements (debugging)
    const consoleLogs = (htmlContent.match(/console\.log/g) || []).length;
    if (consoleLogs > 0) {
        console.log(`✅ Found ${consoleLogs} console.log statements (debugging enabled)`);
    } else {
        console.log('ℹ️  No console.log statements found');
    }
    
    // Check for error handling
    if (htmlContent.includes('try') && htmlContent.includes('catch')) {
        console.log('✅ Error handling found');
    } else {
        console.log('⚠️  Limited error handling found');
    }
    
    // Check for image references
    const imageRefs = (htmlContent.match(/\.png|\.jpg|\.jpeg/g) || []).length;
    if (imageRefs > 0) {
        console.log(`⚠️  Found ${imageRefs} image references (may cause issues)`);
    } else {
        console.log('✅ No problematic image references found');
    }
    
} catch (error) {
    console.log('❌ Error checking for issues:', error.message);
}

console.log('\n🎯 Test Summary:');
console.log('This automated test checks the game code structure and identifies potential issues.');
console.log('For visual testing, you still need to open the browser and check the debug page.');
console.log('\n📱 Next steps:');
console.log('1. Open: https://eyeanton.github.io/SoulTemple/debug-test.html');
console.log('2. Check if all tests show green checkmarks');
console.log('3. If any show red X marks, let me know what they say');
console.log('4. Open: https://eyeanton.github.io/SoulTemple/');
console.log('5. Check if the game displays properly with colored backgrounds');
