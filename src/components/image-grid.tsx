import { favoriteImage } from "~/server/queries";
import BlurImage from "./blur-image";
import FavoriteButton from "./favorite-button";

export type ImageType = {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  favorite: boolean | null;
};

export default function Gallery({ images }: { images: ImageType[] }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <Image key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
}

function Image({ ...image }: ImageType) {
  return (
    <div className="relative grid grid-cols-2">
      <form
        className="left- absolute top-0 z-10  "
        action={async () => {
          "use server";
          await favoriteImage(image.id);
        }}
      >
        <FavoriteButton favorite={!!image.favorite} />
      </form>
      <BlurImage {...image} />
    </div>
  );
}
