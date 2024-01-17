/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'tailwindcss/tailwind.css'
import Markdownrender from './components/Markdownrender' // Import your Markdown render component

const initialItems = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' }
]

const DraggableItem = ({ item, itemType }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: itemType,
    item: { id: item.id, type: itemType, content: item.content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div
      ref={dragRef}
      className={`p-2 mb-2 bg-white border rounded shadow-sm ${isDragging ? 'opacity-50' : ''}`}
    >
      {item.content}
    </div>
  )
}

const DroppableArea = ({ onDropItem, items, itemType, className }) => {
  const [, dropRef] = useDrop({
    accept: itemType === 'item' ? 'droppedItem' : 'item',
    drop: (item, monitor) => {
      onDropItem(item, itemType)
    }
  })

  return (
    <div ref={dropRef} className={className}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} itemType={itemType} />
      ))}
    </div>
  )
}

function Layout() {
  const [leftItems, setLeftItems] = useState(initialItems)
  const [rightItems, setRightItems] = useState([])
  const [markdownContent, setMarkdownContent] = useState('')

  const handleDrop = (droppedItem, targetType) => {
    if (targetType === 'item') {
      // Move item from right to left
      setRightItems((prevItems) => prevItems.filter((item) => item.id !== droppedItem.id))
      setLeftItems((prevLeft) => [...prevLeft, droppedItem])
    } else {
      // Move item from left to right
      setLeftItems((prevItems) => prevItems.filter((item) => item.id !== droppedItem.id))
      setRightItems((prevRight) => [...prevRight, droppedItem])
      setMarkdownContent(droppedItem.content) // Update Markdown view
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <DroppableArea
          onDropItem={handleDrop}
          items={leftItems}
          itemType="item"
          className="w-1/5 bg-gray-100 p-4"
        />
        <DroppableArea
          onDropItem={handleDrop}
          items={rightItems}
          itemType="droppedItem"
          className="w-1/5 bg-gray-200 p-4"
        />
        <div className="w-3/5 bg-gray-300 p-4">
          <Markdownrender markdown={markdownContent} />
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
