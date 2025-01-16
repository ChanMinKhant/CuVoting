const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'n');
const outputCompressedDir = path.join(__dirname, 'compressed'); // For compressed original types
const outputWebpDir = path.join(__dirname, 'webp'); // For WebP outputs

// Ensure the output directories exist
if (!fs.existsSync(outputCompressedDir)) {
  fs.mkdirSync(outputCompressedDir);
}

if (!fs.existsSync(outputWebpDir)) {
  fs.mkdirSync(outputWebpDir);
}

// Function to compress images while preserving size and orientation
const compressImages = async () => {
  try {
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
      const inputFilePath = path.join(inputDir, file);

      // Check if the file is an image
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        const outputCompressedFilePath = path.join(outputCompressedDir, file);
        const outputWebpFilePath = path.join(
          outputWebpDir,
          `${path.parse(file).name}.webp`
        );

        // Compress and save the original type
        // await sharp(inputFilePath)
        //   .rotate() // Automatically correct orientation
        //   .withMetadata() // Preserve metadata (orientation, etc.)
        //   .jpeg({ quality: 90 }) // Compress with normal quality
        //   .toFile(outputCompressedFilePath);

        // Convert to WebP and save
        await sharp(inputFilePath)
          .rotate() // Automatically correct orientation
          .withMetadata() // Preserve metadata
          .webp({ quality: 70 }) // WebP compression quality
          .toFile(outputWebpFilePath);

        console.log(`Processed: ${file}`);
      } else {
        console.log(`Skipped (not an image): ${file}`);
      }
    }
    console.log('Compression completed.');
  } catch (error) {
    console.error('Error compressing images:', error);
  }
};

compressImages();
