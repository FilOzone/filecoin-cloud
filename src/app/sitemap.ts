import type { MetadataRoute } from "next";
import { getAllRFSData } from "@/app/agents/utils/get-rfs-data";
import { PATHS } from "@/constants/paths";
import { BASE_URL } from "@/constants/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = Object.values(PATHS).map(({ path }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const allRFSData = await getAllRFSData();
  const agentRoutes = allRFSData.map(({ slug }) => ({
    url: `${BASE_URL}${PATHS.AGENTS.path}/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...agentRoutes];
}
