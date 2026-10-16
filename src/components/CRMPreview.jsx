
import image from "../image/Hero.png";

export default function CRMPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={image}
        alt="CoreD AI CRM dashboard"
        className="block h-full w-full select-none object-cover object-top"
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
