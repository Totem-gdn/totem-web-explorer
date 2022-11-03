import * as fs from "fs";
import * as path from "path";

const ENVS: {dev: string, prod: string} = {
  dev: 'development',
  prod: 'production',
};

const developmentUrl: string = 'https://dev.totem-explorer.com';
const productionUrl: string = 'https://totem-explorer.com';

const CURRENT_ENV = process.env['NODE_ENV'];
const HOSTNAME = CURRENT_ENV == ENVS.dev ? developmentUrl : productionUrl;

const routes = [
  {
    data: {
      loc: '',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'items',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'avatars',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'games',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'help',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'buy',
      lastmod: new Date()
    },
  },
  {
    data: {
      loc: 'terms-and-policy',
      lastmod: new Date()
    },
  },
];

const robots = `User-agent: *
Disallow: /profile/
Disallow: /game/
Disallow: /item/
Disallow: /gem/
Disallow: /avatar/
Disallow: /approve-game/
Disallow: /submit-game/
Disallow: /approve-game/
Allow: /

Sitemap: ${HOSTNAME}/sitemap.xml`;

fs.writeFileSync(path.join(__dirname, "./src/robots.txt"), robots);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  .concat(
    routes
      .map((route) => {
        return `
        <url>
        <loc>${HOSTNAME}/${route.data.loc}</loc>
        <lastmod>${route.data.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        </url>`;
        }
      )
      .join("\n")
  )
  .concat("\n</urlset>");

fs.writeFileSync(path.join(__dirname, "./src/sitemap.xml"), sitemap);
