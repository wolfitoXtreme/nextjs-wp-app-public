import Image from "next/image";

export const Gallery = ({ columns = 1, cropImages, images }) => {
  const imageInGrid = Math.ceil(images.length / columns) * columns;
  const spareSpace = imageInGrid - images.length + 1;

  return (
    <div className={`grid grid-cols-${columns} max-w-5xl mx-auto gap-3`}>
      {images.map(
        ({ id: imageId, attributes: { url, width, height, alt } }, index) => {
          const imageCount = index + 1;
          const remainingImages = imageInGrid - imageCount;
          const isLastAndSpareSpace =
            imageCount === images.length && remainingImages !== 0;

          return (
            <div
              key={imageId}
              // FUCK TailWind and the assholes who support it
              style={
                isLastAndSpareSpace
                  ? {
                      gridColumn: `span ${spareSpace}`,
                    }
                  : {}
              }
            >
              <div className="relative w-full overflow-hidden h-[300px]">
                <Image
                  src={url}
                  width={width}
                  height={height}
                  alt={alt || ""}
                  className="w-full h-full object-cover absolute"
                />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
