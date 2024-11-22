'use server'
import { JSDOM } from "jsdom";

// Function to fetch Open Graph details for a given URL
export const extractMetaTags = async (url: string) => {
  try {
    // Fetch the content of the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Function to infer store name from URL
    const getStoreName = (url: string) => {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      const storeName = hostname.split('.')[0]; // Extracts the subdomain or domain name
      return storeName.charAt(0).toUpperCase() + storeName.slice(1); // Capitalize the first letter
    };

    // Define the type for tags as a Record with string keys and values
    const metaTags: Record<string, string> = Array.from(document.querySelectorAll("meta")).reduce(
      (tags: Record<string, string>, meta) => {
        // Get the name, property, or itemprop attribute of the meta tag
        const name =
          meta.getAttribute("name") ||
          meta.getAttribute("property") ||
          meta.getAttribute("itemprop");

        // Get the content attribute of the meta tag
        const content = meta.getAttribute("content");

        // If both name and content exist, add them to the tags object
        if (name && content) {
          tags[name] = content;
        }

        return tags;
      },
      {} as Record<string, string> // Explicitly type the initial value
    );

    // Return an object containing title, description, image, price, and store
    return {
      title:
        document.title || metaTags["og:title"] || metaTags["twitter:title"],
      description:
        metaTags.description ||
        metaTags["og:description"] ||
        metaTags["twitter:description"],
      image:
        metaTags.image || metaTags["og:image"] || metaTags["twitter:image"],
      price: metaTags["product:price:amount"] || metaTags["og:price:amount"],
      url,
      store: getStoreName(url) // Infer store name from URL
    };
  } catch (error) {
    // Handle errors if fetching or parsing fails
    console.error("Error fetching Open Graph details", error);
  }
};