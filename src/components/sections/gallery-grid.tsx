import Image from "next/image";
import type { GalleryCollection } from "@/types/content";

type GalleryGridProps = {
  heading: string;
  collections: GalleryCollection[];
};

/** ~one column mobile, half grid desktop; aligns with `.container` width. */
const GALLERY_SIZES = "(max-width: 640px) 92vw, (max-width: 1200px) 46vw, 520px";

export function GalleryGrid({ heading, collections }: GalleryGridProps) {
  const eagerSrcs = new Set(collections.flatMap((c) => c.images).slice(0, 2));

  return (
    <section className="container py-20">
      <h1 className="display text-4xl md:text-6xl">{heading}</h1>
      <div className="mt-10 space-y-12">
        {collections.map((collection) => (
          <article key={collection.title}>
            <h2 className="display text-3xl text-[var(--sjsu-blue)]">{collection.title}</h2>
            <p className="text-caption mt-2 text-slate-700">{collection.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {collection.images.map((image) => {
                const eager = eagerSrcs.has(image);
                return (
                  <div
                    key={image}
                    className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100"
                  >
                    <Image
                      src={image}
                      alt={collection.title}
                      width={800}
                      height={534}
                      sizes={GALLERY_SIZES}
                      quality={72}
                      priority={eager}
                      fetchPriority={eager ? "high" : undefined}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
