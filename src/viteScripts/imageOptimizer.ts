// plugins/image-optimizer.js
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

/**
 * Плагин для оптимизации изображений после сборки
 * @param {Object} options - Настройки оптимизации
 * @param {number} options.maxSizeKB - Максимальный размер в KB
 * @param {number} options.jpegQuality - Качество JPEG (0-100)
 * @param {number} options.pngQuality - Качество PNG (0-100)
 * @param {number} options.webpQuality - Качество WebP (0-100)
 */

interface Options {
  maxSizeKB: number;
  jpegQuality?: number;
  pngQuality?: number;
  webpQuality?: number;
}

function imageOptimizerPlugin(options: Options) {
  const {
    maxSizeKB = 500,
    jpegQuality = 80,
    pngQuality = 80,
    webpQuality = 80,
  } = options;

  // Вспомогательные функции
  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|bmp|tiff)$/i.test(filename);
  };

  const compressImage = async (filePath: string, options: Options) => {
    const ext = path.extname(filePath).toLowerCase();
    let sharpInstance = sharp(filePath);

    switch (ext) {
      case ".jpg":
      case ".jpeg":
        sharpInstance = sharpInstance.jpeg({
          quality: options.jpegQuality,
          progressive: true,
          mozjpeg: true,
        });
        break;

      case ".png":
        sharpInstance = sharpInstance.png({
          quality: options.pngQuality,
          compressionLevel: 9,
        });
        break;

      case ".webp":
        sharpInstance = sharpInstance.webp({
          quality: options.webpQuality,
        });
        break;

      case ".avif":
        sharpInstance = sharpInstance.avif({
          quality: options.webpQuality,
        });
        break;

      default:
        return fs.readFile(filePath);
    }

    return sharpInstance.toBuffer();
  };

  const optimizeImageIfNeeded = async (filePath: string, options: Options) => {
    try {
      const stats = await fs.stat(filePath);
      const sizeKB = stats.size / 1024;

      if (sizeKB > options.maxSizeKB) {
        console.log(
          `🔄 Оптимизация: ${path.basename(filePath)} (${sizeKB.toFixed(2)}KB)`
        );

        const optimizedBuffer = await compressImage(filePath, options);
        await fs.writeFile(filePath, optimizedBuffer);

        const newSizeKB = optimizedBuffer.length / 1024;
        const savedKB = sizeKB - newSizeKB;
        const percentSaved = ((savedKB / sizeKB) * 100).toFixed(1);

        console.log(
          `✅ Оптимизировано: ${path.basename(
            filePath
          )} - ${percentSaved}% сэкономлено (${newSizeKB.toFixed(2)}KB)`
        );
      }
    } catch (error) {
      console.error(`❌ Ошибка оптимизации ${path.basename(filePath)}:`, error);
    }
  };

  const optimizeImagesInDirectory = async (
    dirPath: string,
    options: Options
  ) => {
    try {
      const items = await fs.readdir(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          await optimizeImagesInDirectory(fullPath, options);
        } else if (isImageFile(item)) {
          await optimizeImageIfNeeded(fullPath, options);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Не удалось обработать директорию ${dirPath}:`, error);
    }
  };

  return {
    name: "vite-plugin-image-optimizer",

    async closeBundle() {
      console.log("🔍 Поиск изображений для оптимизации...");

      const distDir = path.resolve(process.cwd(), "dist");
      await optimizeImagesInDirectory(distDir, {
        maxSizeKB,
        jpegQuality,
        pngQuality,
        webpQuality,
      });
    },
  };
}

export default imageOptimizerPlugin;
