import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

export const urlFor = (source: Image | string): string => {
  if (typeof source === "string") {
    return source;
  }

  return builder.image(source).auto("format").fit("max").url();
};

/**
 * Competition/gallery tiles are small on screen (~560px wide max in grid); avoid loading
 * full-resolution Sanity assets (huge URLs) when the Image optimizer can only use ~2× that.
 */
export function urlForGalleryThumb(source: Image | string, maxWidth = 1120): string {
  if (typeof source === "string") {
    return source;
  }

  return builder.image(source).width(maxWidth).quality(72).auto("format").fit("max").url();
}
