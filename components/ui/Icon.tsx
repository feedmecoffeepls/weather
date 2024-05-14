import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IconProps {
  iconId: string;
  alt: string;
  iconSize?: number;
}

const Icon = ({ iconId, alt, iconSize = 64 }: IconProps) => {
  const base_url = "https://openweathermap.org/img/wn/";
  const size = ".png";
  const constructed_url = `${base_url}${iconId}${size}`;
  return (
    <div className="pointer-events-auto sm:pointer-events-none">
      <Popover>
        <PopoverTrigger>
          <Image
            src={constructed_url}
            alt={alt}
            width={iconSize}
            height={iconSize}
          />
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-center font-bold capitalize">{alt}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Icon;
