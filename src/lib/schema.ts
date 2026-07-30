// Shared JSON-LD schema helpers for Yog Jivan routes.

const SITE = "https://yogjivan.com";

export function breadcrumbSchema(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: pageName, item: SITE + path },
    ],
  };
}

const ORG_REF = { "@type": "Organization", name: "Yog Jivan", url: SITE };

type ServiceInput = {
  name: string;
  serviceType: string;
  description: string;
  areaServed: string;
  url: string;
};

export function serviceSchema(s: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    provider: ORG_REF,
    areaServed: s.areaServed === "Worldwide"
      ? { "@type": "Place", name: "Worldwide" }
      : { "@type": "AdministrativeArea", name: s.areaServed },
    url: SITE + s.url,
  };
}
