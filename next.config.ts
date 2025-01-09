import type { NextConfig } from "next";
import dotenv from "dotenv";

const nextConfig: NextConfig = {
  env: {
    FLOW_ID: process.env.FLOW_ID,
    LANGFLOW_ID: process.env.LANGFLOW_ID,
    APPLICATION_TOKEN: process.env.APPLICATION_TOKEN,
  },
};

export default nextConfig;
