const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const DOMAIN = 'https://your-site-url.netlify.app';

async function generateSitemap() {
  const pages = await glob('**/*.html', { cwd: path.join(process.cwd(), 'out') });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const path = page
        .replace('/index.html', '')
        .replace('.html', '');
      const route = path === 'index' ? '' : path;
      return `
    <url>
      <loc>${DOMAIN}/${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
