/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://testing-frontend-2.vercel.app',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000, // split into multiple if more than 7000 URLs
  changefreq: 'daily',
  priority: 0.7,
};