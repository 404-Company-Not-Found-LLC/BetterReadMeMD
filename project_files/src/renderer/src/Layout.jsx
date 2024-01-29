/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper' // npm install immutability-helper
import Markdown from './components/Markdownrender' // Import your Markdown component
import { v4 as uuidv4 } from 'uuid' // npm install uuid
import 'tailwindcss/tailwind.css'

const initialButtons = ['Heading', 'Code', 'Item 3']
// # Heading 1
// `code`
const ItemTypes = { CARD: 'card' }

const DraggableItem = ({ id, content, index, moveCard }) => {
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index }
  })

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (item.index !== index) {
        moveCard(item.index, index)
        item.index = index
      }
    }
  })

  return (
    <div ref={(node) => drag(drop(node))} className="p-2 bg-gray-300 rounded">
      {content}
    </div>
  )
}

const ItemForm = ({ show, onSubmit, onClose, defaultValue }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (show) {
      setValue(defaultValue)
    }
  }, [show, defaultValue])

  if (!show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
    onClose() // Close form after submit
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

function Layout() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [markdownMap, setMarkdownMap] = useState({}) // Maps item IDs to markdown content

  // Find the markdown content for the selected item
  const selectedItemContent = items.find((item) => item.id === selectedItemId)?.content || ''

  const handleItemClick = (id) => {
    setSelectedItemId(id)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedItemId(null)
  }

  const handleFormSubmit = (content) => {
    setMarkdownMap((prevMarkdownMap) => ({
      ...prevMarkdownMap,
      [selectedItemId]: content
    }))
    handleCloseForm() // Close form after submit
  }

  const handleButtonClick = (buttonLabel) => {
    const newItem = {
      id: uuidv4(), // Generate a unique ID for each item
      content: buttonLabel
    }
    setItems([...items, newItem])
  }

  const moveCard = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]
    setItems(
      update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      })
    )
  }

  const renderButtons = () => (
    <div className="flex flex-col space-y-2">
      {initialButtons.map((buttonLabel, index) => (
        <button
          key={index}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleButtonClick(buttonLabel)}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  )

  const renderMarkdownContent = () => {
    return items.map((item) => markdownMap[item.id] || item.content).join('\n')
  }

  const renderDraggableItems = () => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div onClick={() => handleItemClick(item.id)} key={item.id}>
          <DraggableItem id={item.id} content={item.content} index={index} moveCard={moveCard} />
        </div>
      ))}
    </div>
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Button Area */}
        <div className="w-1/6 p-4">{renderButtons()}</div>

        {/* Draggable Items Area */}
        <div className="w-1/3 bg-gray-200 p-4">{renderDraggableItems()}</div>

        {/* Markdown Display Area */}
        <div className="w-1/2 bg-gray-300 p-4">
          <Markdown content={renderMarkdownContent()} />
        </div>
      </div>

      {/* Item Form */}
      <ItemForm
        show={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        defaultValue={selectedItemContent}
      />
    </DndProvider>
  )
}

export default Layout
