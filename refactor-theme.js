const fs = require('fs');
const path = require('path');

// Target directory
const dir = path.join(__dirname, 'src');

// Function to recursively find all .tsx files
function getFiles(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, filesList);
        } else if (fullPath.endsWith('.tsx')) {
            filesList.push(fullPath);
        }
    }
    return filesList;
}

// Map of replacements (from dark to light)
// Ordered to prevent partial matches replacing incorrectly
const replacements = [
    // Exact colors (excluding #8B5CF6)
    { from: /bg-\[\#000000\]/g, to: 'bg-white' },
    { from: /bg-\[\#000\]/g, to: 'bg-white' },
    { from: /bg-\[\#0a0a0a\]/g, to: 'bg-gray-50' },
    { from: /text-\[\#fff\]/g, to: 'text-black' },
    { from: /text-\[\#ffffff\]/g, to: 'text-black' },
    
    // Backgrounds
    { from: /bg-black\/(\d+)/g, to: 'bg-black/$1' }, // keep this as is but match first to avoid bg-black replacing part of it
    { from: /(?<!\w)bg-black(?!\/)/g, to: 'bg-white' },
    { from: /bg-white\/(\d+)/g, to: 'bg-black/$1' },
    
    // Gray Backgrounds
    { from: /bg-gray-900/g, to: 'bg-gray-50' },
    { from: /bg-gray-800/g, to: 'bg-gray-100' },
    { from: /bg-gray-700/g, to: 'bg-gray-200' },

    // Text
    { from: /(?<!\w)text-white(?!\/)/g, to: 'text-gray-900' },
    { from: /text-white\/(\d+)/g, to: 'text-black/$1' },
    { from: /text-gray-400/g, to: 'text-gray-600' },
    { from: /text-gray-300/g, to: 'text-gray-700' },
    { from: /text-gray-500/g, to: 'text-gray-500' }, // maybe leave alone

    // Borders
    { from: /(?<!\w)border-white(?!\/)/g, to: 'border-black' },
    { from: /border-white\/(\d+)/g, to: 'border-black/$1' },
    { from: /border-gray-800/g, to: 'border-gray-200' },
    { from: /border-gray-700/g, to: 'border-gray-300' },

    // Gradients
    { from: /from-black/g, to: 'from-white' },
    { from: /via-black/g, to: 'via-white' },
    { from: /to-black/g, to: 'to-white' },
    { from: /from-gray-900/g, to: 'from-gray-50' },
    { from: /via-gray-900/g, to: 'via-gray-50' },
    { from: /to-gray-900/g, to: 'to-gray-50' },
];

function runReplacements() {
    const files = getFiles(dir);
    let modifiedFiles = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        for (const { from, to } of replacements) {
            content = content.replace(from, to);
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            modifiedFiles++;
            console.log(`Updated: ${file}`);
        }
    }

    console.log(`\nSuccessfully modified ${modifiedFiles} files.`);
}

runReplacements();
