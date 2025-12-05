import { View } from "react-native"
import {CLoudSun, MoonStars, SunFog} from "@assets"

export default function ThemeField(){

    return (
        <View className="w-[252px] h-[70px] rounded-[32px] my-8 bg-white elevation-md shadow-md flex flex-row justify-evenly self-center items-center">
            <CLoudSun width={20} />
            <MoonStars width={20} />
            <SunFog width={20} />
        </View>
    )
}