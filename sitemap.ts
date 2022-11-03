import * as fs from "fs";
import * as path from "path";
import { environment } from './src/environments/environment'

const HOSTNAME = process.env['NODE_ENV'] || environment.TOTEM_WEB_EXPLORER_URL;
var routes = [
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

Sitemap: ${HOSTNAME}/sitemap.xml`

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
