import { useState } from 'react'
import { FlatList } from 'react-native'

import { TrendingItem } from './TrendingItem'

export const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={item => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  )
}
