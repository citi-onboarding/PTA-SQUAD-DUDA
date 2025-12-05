import Image, {StaticImageData} from "next/image";
import catImg from "../../assets/cat.svg";
import dogImg from "../../assets/dog.svg";
import horseImg from "../../assets/horse.svg";
import cowImg from "../../assets/cow.svg";
import pigImg from "../../assets/pig.svg";
import sheepImg from "../../assets/sheep.svg";

interface PetAvatarProps {
    species: string; 
    alt: string;
}

const petImages: Record<string, StaticImageData> = {
    DOG: dogImg,
    CAT: catImg,
    HORSE: horseImg,
    COW: cowImg,
    PIG: pigImg,
    SHEEP: sheepImg,
};

export default function PetAvatar({ species, alt }: PetAvatarProps) {
    const imageSrc = petImages[species.toUpperCase()];

    return (
        <div className="relative w-[295px] h-[299px]">
            <Image 
                src={imageSrc} 
                alt={alt} 
                fill
                className="object-contain" 
            />
        </div>
  );
}