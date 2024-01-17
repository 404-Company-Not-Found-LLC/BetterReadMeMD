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

const Bin = ({ onDropToBin }) => {
  const [, dropRef] = useDrop({
    accept: 'droppedItem',
    drop: (item, monitor) => {
      onDropToBin(item.id)
    }
  })

  return (
    <div
      ref={dropRef}
      className="border-2 border-dashed border-red-500 p-2 text-center text-red-500 mt-2"
    >
      Drag here to delete
    </div>
  )
}

function Layout() {
  const [rightItems, setRightItems] = useState([])
  const [markdownContent, setMarkdownContent] = useState('')

  const handleDrop = (droppedItem, targetType) => {
    if (targetType === 'droppedItem') {
      // Add the new item to the rightItems list
      const newRightItems = [...rightItems, { ...droppedItem, id: `dropped-${Date.now()}` }]

      // Update the rightItems state
      setRightItems(newRightItems)

      // Update the markdownContent to include all items in the rightItems list
      const newMarkdownContent = newRightItems.map((item) => item.content).join('\n')
      setMarkdownContent(newMarkdownContent)
    }
  }

  const handleDropToBin = (itemId) => {
    // Remove the item from rightItems
    const updatedItems = rightItems.filter((item) => item.id !== itemId)
    setRightItems(updatedItems)

    // Update the markdown content
    const newMarkdownContent = updatedItems.map((item) => item.content).join('\n')
    setMarkdownContent(newMarkdownContent)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Drag Area */}
        <div className="w-1/5 bg-gray-100 p-4">
          {initialItems.map((item) => (
            <DraggableItem key={item.id} item={item} itemType="item" />
          ))}
        </div>

        {/* Drop Area and Bin Area */}
        <div className="flex flex-col w-1/5 bg-gray-200 p-4">
          <DroppableArea
            onDropItem={handleDrop}
            items={rightItems}
            itemType="droppedItem"
            className="flex-grow"
          />
          <Bin onDropToBin={handleDropToBin} className="mt-auto" />
        </div>

        {/* Markdown Area */}
        <div className="w-3/5 bg-gray-300 p-4">
          <Markdownrender markdown={markdownContent} />
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
