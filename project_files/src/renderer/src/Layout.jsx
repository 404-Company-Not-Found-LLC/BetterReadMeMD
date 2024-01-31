/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper' // npm install immutability-helper
import Markdown from './components/Markdownrender' // Import your Markdown component
import { v4 as uuidv4 } from 'uuid' // npm install uuid
import 'tailwindcss/tailwind.css'

function Layout() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    console.log('Updated items:', items)
  }, [items])

  const handleFormSubmit = () => {
    // Convert formData to JSON and create a new item
    const newItem = { ...formData, id: uuidv4(), type: selectedItem.type }

    // Update the items array with the new item using a functional update
    setItems((prevItems) => [...prevItems, newItem])

    // Reset form data and close the form
    setFormData({})
    setShowForm(false)
  }

  // Render buttons to add "heading" and "code" items
  const renderButtons = () => (
    <div className="flex flex-col space-y-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setSelectedItem({ type: 'heading' })
          setFormData({ text: '' }) // Reset form data
          setShowForm(true)
        }}
      >
        Add Heading
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setSelectedItem({ type: 'code' })
          setFormData({ code: '' }) // Reset form data
          setShowForm(true)
        }}
      >
        Add Code
      </button>
    </div>
  )

  // Render the form based on the selected item type
  const renderForm = () => {
    if (!selectedItem) return null

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleFormSubmit()
            }}
          >
            {selectedItem.type === 'heading' ? (
              <>
                <input
                  type="heading"
                  placeholder="Heading"
                  value={formData.text || ''}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
                <select
                  value={formData.level || 'h1'}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <option value="h1">h1</option>
                  <option value="h2">h2</option>
                  <option value="h3">h3</option>
                </select>
              </>
            ) : selectedItem.type === 'code' ? (
              <textarea
                placeholder="Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            ) : null}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Button Area */}
        <div className="w-1/6 p-4">{renderButtons()}</div>

        {/* Draggable Items Area */}
        <div className="w-1/3 bg-gray-200 p-4"></div>

        {/* Markdown Display Area */}
        <div className="w-1/2 bg-gray-300 p-4"></div>
      </div>

      {/* Form Popup */}
      {showForm && renderForm()}
    </DndProvider>
  )
}

export default Layout
