import Image, {StaticImageData} from "next/image";
import catImg from "../../assets/cat.png";
import dogImg from "../../assets/doggo.png";
import horseImg from "../../assets/horse.png";
import cowImg from "../../assets/cow.png";
import pigImg from "../../assets/pig.png";
import sheepImg from "../../assets/sheep.png";

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
        <div className="relative w-full md:w-[295px] h-[299px]">
            <Image 
                src={imageSrc} 
                alt={alt} 
                fill
                className="object-contain" 
            />
        </div>
  );
}