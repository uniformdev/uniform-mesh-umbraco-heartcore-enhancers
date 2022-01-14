/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET,
    canvasApiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    uniformApiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    heartcoreProjectAlias: process.env.UMBRACO_HEARTCORE_PROJECT_ALIAS,
    heartcoreApiKey: process.env.UMBRACO_HEARTCORE_API_KEY,  
  },
  reactStrictMode: true,
}

module.exports = nextConfig
