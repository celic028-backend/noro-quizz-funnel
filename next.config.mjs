/** @type {import('next').NextConfig} */

// GitHub Pages: static export + basePath (naziv repo-a). Lokalno (dev) basePath je prazan.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "/noro-quizz-funnel";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isPages ? repo : "",
  assetPrefix: isPages ? `${repo}/` : "",
};

export default nextConfig;
