import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'content-md', '10_ai_related_course');
const targetRoot = path.join(root, 'dist', 'course-assets', '10_ai_related_course');
const allowedExtensions = new Set(['.html', '.js', '.mp4', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.css']);

async function copyAssets(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  await fs.mkdir(targetDir, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyAssets(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

try {
  await fs.access(sourceRoot);
  await fs.rm(targetRoot, { recursive: true, force: true });
  await copyAssets(sourceRoot, targetRoot);
  console.log(`Copied course assets to ${path.relative(root, targetRoot)}`);
} catch (error) {
  if (error?.code === 'ENOENT') {
    console.log('No course assets found to copy.');
  } else {
    throw error;
  }
}
