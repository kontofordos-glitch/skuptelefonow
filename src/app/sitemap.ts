import type { MetadataRoute } from "next";

const routes = [
  "",
  "/jak-dziala-skup",
  "/wycena-iphone",
  "/modele-iphone",
  "/opinie",
  "/kontakt",
  "/regulamin",
  "/polityka-prywatnosci"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jablkoskup.pl";
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/wycena-iphone" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/wycena-iphone" ? 0.9 : 0.7
  }));
}
