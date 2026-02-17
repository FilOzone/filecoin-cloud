import type { MetadataRoute } from "next";

import { getAllRFSData } from "@/app/agents/utils/get-rfs-data";
import { PATHS } from "@/constants/paths";
import { BASE_URL } from "@/constants/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = getStaticRoutes();
  const agentRoutes = await getAgentRoutes();

  return [...staticRoutes, ...agentRoutes];
}

const lastModified = new Date();

function getStaticRoutes() {
  return Object.values(PATHS).map(({ path }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}

async function getAgentRoutes() {
  const allRFSData = await getAllRFSData();

  return allRFSData.map(({ slug }) => ({
    url: `${BASE_URL}${PATHS.AGENTS.path}/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}
