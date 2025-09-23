// cors-config.ts - CORS configuration for production
export const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://*.vercel.app",
    "https://improve-read-skill.vercel.app",
    // Add your actual Vercel domain here
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
