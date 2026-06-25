// Renders an AVIF -> WebP -> JPEG <picture> from an imageSet() (see lib/images.js).
// The <picture> uses `display: contents` so the inner <img> inherits the parent's
// layout exactly — drop-in replacement for a plain <img> with the same className.

export default function ResponsiveImage({
  image,
  alt,
  className,
  width,
  height,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
}) {
  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.src}
        srcSet={image.jpg}
        sizes={sizes}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
