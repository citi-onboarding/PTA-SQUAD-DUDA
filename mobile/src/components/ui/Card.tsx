import { View } from "react-native"

type CardProps = {
    children: any,
    className: string,
}

export default function Card({children, className, ...props}: CardProps){
    return (
        <View className={`rounded-xl border-none bg-card text-card-foreground shadow ${className}`} {...props}>
            {children}
        </View>
    )
}