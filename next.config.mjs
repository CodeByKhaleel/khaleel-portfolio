const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/khaleel-portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
