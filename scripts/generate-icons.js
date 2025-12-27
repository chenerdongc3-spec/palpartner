// 这是一个图标生成脚本的示例
// 你需要准备一个 512x512 的原始图标文件，然后使用这个脚本生成不同尺寸的图标

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 需要生成的图标尺寸
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

// 创建 icons 目录
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Icons directory created at:', iconsDir);
console.log('Please place your 512x512 source icon in the icons directory and use an image processing tool to generate the following sizes:');

iconSizes.forEach(size => {
  console.log(`- icon-${size}x${size}.png`);
});

console.log('\nYou can use online tools like:');
console.log('- https://realfavicongenerator.net/');
console.log('- https://www.favicon-generator.org/');
console.log('- Or use ImageMagick: convert source.png -resize 72x72 icon-72x72.png');

// 创建一个简单的 SVG 图标作为占位符
const placeholderSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#D4B5A0" rx="64"/>
  <circle cx="256" cy="200" r="80" fill="#FFFFFF"/>
  <circle cx="230" cy="180" r="12" fill="#2C3E5A"/>
  <circle cx="282" cy="180" r="12" fill="#2C3E5A"/>
  <ellipse cx="256" cy="210" rx="6" ry="4" fill="#E8B4B8"/>
  <path d="M 256 220 Q 240 240 220 230" stroke="#2C3E5A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 256 220 Q 272 240 292 230" stroke="#2C3E5A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="256" cy="350" rx="120" ry="80" fill="#FFFFFF"/>
  <text x="256" y="450" text-anchor="middle" fill="#8B7355" font-family="Arial" font-size="24" font-weight="bold">Sleep Pet</text>
</svg>
`;

fs.writeFileSync(path.join(iconsDir, 'placeholder-icon.svg'), placeholderSVG.trim());
console.log('\nPlaceholder SVG icon created: public/icons/placeholder-icon.svg');
console.log('You can convert this SVG to PNG files of different sizes.');