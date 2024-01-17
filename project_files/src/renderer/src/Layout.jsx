/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'tailwindcss/tailwind.css'
import Markdownrender from './components/Markdownrender' // Import your Markdown render component

const initialItems = [
  { id: 'item-1', content: 'Item 1', type: 'type1' },
  { id: 'item-2', content: 'Item 2', type: 'type2' },
  { id: 'item-3', content: 'Item 3', type: 'type3' }
]

const DraggableItem = ({ item, itemType, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: itemType,
    item: { id: item.id, type: itemType, content: item.content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleClick = () => {
    if (onClick) onClick(item)
  }

  return (
    <div
      ref={dragRef}
      className={`p-2 mb-2 bg-white border rounded shadow-sm ${isDragging ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      {item.content}
    </div>
  )
}

const DroppableArea = ({ onDropItem, items, itemType, className, onItemClick }) => {
  const [, dropRef] = useDrop({
    accept: itemType === 'item' ? 'droppedItem' : 'item',
    drop: (item, monitor) => {
      onDropItem(item, itemType)
    }
  })

  return (
    <div ref={dropRef} className={className}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} itemType={itemType} onClick={onItemClick} />
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
  const [selectedItem, setSelectedItem] = useState(null)

  const handleDrop = (droppedItem, targetType) => {
    if (targetType === 'droppedItem') {
      // Find the original item to get its type
      const originalItem = initialItems.find((item) => item.id === droppedItem.id)

      // Add the new item to the rightItems list with the correct type
      const newItem = {
        ...droppedItem,
        id: `dropped-${Date.now()}`,
        type: originalItem ? originalItem.type : droppedItem.type // Use the original item's type
      }
      const newRightItems = [...rightItems, newItem]

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

  const handleItemClick = (item) => {
    console.log('itemType:', item.type)
    setSelectedItem(item)
    // Set the form to be shown if needed
  }

  const renderForm = (selectedItem) => {
    const commonProps = {
      onSubmit: handleFormSubmit,
      selectedItem: selectedItem // Pass the selected item to the form
    }

    switch (
      selectedItem.type // Use selectedItem.template here
    ) {
      case 'type1':
        return <FormType1 {...commonProps} />
      case 'type2':
        return <FormType2 {...commonProps} />
      case 'type3':
        return <FormType3 {...commonProps} />
      default:
        return null
    }
  }
  const handleFormSubmit = (itemId, newContent) => {
    const updatedItems = rightItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, content: newContent }
      }
      return item
    })
    setRightItems(updatedItems)
    setMarkdownContent(updatedItems.map((item) => item.content).join('\n'))
    setSelectedItem(null) // Hide the form after submission
  }

  const FormType1 = ({ selectedItem, onSubmit }) => {
    const [inputValue, setInputValue] = useState(selectedItem.content)

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(selectedItem.id, inputValue)
    }

    return (
      <div className="p-4 border rounded">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
              Edit Content
            </label>
            <input
              type="text"
              id="inputField"
              name="inputField"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  const FormType2 = ({ selectedItem, onSubmit }) => {
    const [inputValue, setInputValue] = useState(selectedItem.content)

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(selectedItem.id, inputValue)
    }

    return (
      <div className="p-4 border rounded">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
              Edit Content
            </label>
            <input
              type="text"
              id="inputField"
              name="inputField"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  const FormType3 = ({ selectedItem, onSubmit }) => {
    const [inputValue, setInputValue] = useState(selectedItem.content)

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(selectedItem.id, inputValue)
    }

    return (
      <div className="p-4 border rounded">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputField" className="block text-sm font-medium text-gray-700">
              Edit Content
            </label>
            <input
              type="text"
              id="inputField"
              name="inputField"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
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
            onItemClick={handleItemClick}
          >
            {rightItems.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                itemType="droppedItem"
                onClick={handleItemClick}
              />
            ))}
          </DroppableArea>
          <Bin onDropToBin={handleDropToBin} className="mt-auto" />
        </div>

        {selectedItem && renderForm(selectedItem)}

        {/* Markdown Area */}
        <div className="w-3/5 bg-gray-300 p-4">
          <Markdownrender markdown={markdownContent} />
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
