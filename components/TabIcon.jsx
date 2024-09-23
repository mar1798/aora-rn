import { Image, Text, View } from 'react-native'
import React from 'react'

export const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}
