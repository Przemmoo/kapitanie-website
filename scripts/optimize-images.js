#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts JPEG/PNG images to WebP format for better performance
 * 
 * Usage: node scripts/optimize-images.js
 * Requirements: npm install sharp
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = './public/images';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 85;

async function processDirectory(dir) {
  try {
    const items = await readdir(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        await processDirectory(fullPath);
      } else if (stats.isFile()) {
        await processImage(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
}

async function processImage(imagePath) {
  const ext = extname(imagePath).toLowerCase();
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    return; // Skip non-image files
  }
  
  const dir = imagePath.substring(0, imagePath.lastIndexOf('/'));
  const name = basename(imagePath, ext);
  const webpPath = join(dir, `${name}.webp`);
  
  try {
    // Check if WebP version already exists
    try {
      await stat(webpPath);
      console.log(`⏭️  Skipping ${imagePath} (WebP already exists)`);
      return;
    } catch {
      // WebP doesn't exist, continue with conversion
    }
    
    // Convert to WebP
    await sharp(imagePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);
      
    console.log(`✅ Converted ${imagePath} → ${webpPath}`);
    
    // Generate responsive sizes
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    if (metadata.width && metadata.width > 800) {
      const sizes = [
        Math.floor(metadata.width * 0.75),
        Math.floor(metadata.width * 0.5),
        400
      ].filter(size => size >= 200);
      
      for (const size of sizes) {
        const responsivePath = join(dir, `${name}_${size}w${ext}`);
        const responsiveWebpPath = join(dir, `${name}_${size}w.webp`);
        
        try {
          await stat(responsivePath);
          continue; // Skip if already exists
        } catch {
          // Create responsive version
          await sharp(imagePath)
            .resize(size, null, { withoutEnlargement: true })
            .toFile(responsivePath);
            
          await sharp(imagePath)
            .resize(size, null, { withoutEnlargement: true })
            .webp({ quality: WEBP_QUALITY })
            .toFile(responsiveWebpPath);
            
          console.log(`📐 Created responsive: ${responsivePath} & ${responsiveWebpPath}`);
        }
      }
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${imagePath}:`, error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Processing directory: ${INPUT_DIR}`);
  console.log(`🎨 WebP quality: ${WEBP_QUALITY}%`);
  console.log('---');
  
  try {
    await processDirectory(INPUT_DIR);
    console.log('---');
    console.log('✨ Image optimization completed!');
    console.log('💡 Remember to update your components to use OptimizedImage.astro');
  } catch (error) {
    console.error('💥 Failed to process images:', error.message);
    process.exit(1);
  }
}

// Run only if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
