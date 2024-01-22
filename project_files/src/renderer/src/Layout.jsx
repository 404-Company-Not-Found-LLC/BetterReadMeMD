/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import Markdownrender from './components/Markdownrender'

const initialForms = [
  { id: 'form1', label: 'Form 1', type: 'type1' },
  { id: 'form2', label: 'Form 2', type: 'type2' }
]

const SimpleForm = ({ onSubmit, type }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ type, content: inputValue })
    setInputValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 border rounded"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  )
}

function Layout() {
  const [markdownContent, setMarkdownContent] = useState('')
  const [items, setItems] = useState([])
  const [activeForm, setActiveForm] = useState(null)
  const [editingIndex, setEditingIndex] = useState(-1)

  const handleFormSubmit = (item) => {
    if (editingIndex > -1) {
      // Editing an existing item
      const updatedItems = items.map((itm, idx) =>
        idx === editingIndex ? { ...itm, content: item.content } : itm
      )
      setItems(updatedItems)
      setMarkdownContent(updatedItems.map((i) => i.content).join('\n'))
      setEditingIndex(-1) // Reset editing index
    } else {
      // Adding a new item
      const newItem = { ...item, id: `dropped-${Date.now()}` }
      const newItems = [...items, newItem]
      setItems(newItems)
      setMarkdownContent(newItems.map((i) => i.content).join('\n'))
    }
    setActiveForm(null) // Hide form after submission
  }

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, idx) => idx !== index)
    setItems(newItems)
    updateMarkdownContent(newItems)
  }

  const handleEditItem = (index) => {
    setEditingIndex(index)
    setActiveForm(items[index].type)
  }

  const moveItem = (index, direction) => {
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < items.length - 1)) {
      const newItems = [...items]
      const item = newItems[index]
      newItems.splice(index, 1)
      newItems.splice(direction === 'up' ? index - 1 : index + 1, 0, item)
      setItems(newItems)
      updateMarkdownContent(newItems)
    }
  }

  const updateMarkdownContent = (newItems) => {
    setMarkdownContent(newItems.map((item) => item.content).join('\n'))
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100 p-4">
        {initialForms.map((form) => (
          <button
            key={form.id}
            onClick={() => setActiveForm(form.type)}
            className="mb-2 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full text-left"
          >
            {form.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="w-1/5 bg-gray-200 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-white border rounded shadow-sm flex items-center justify-between"
          >
            <div>
              <button
                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                onClick={() => moveItem(index, 'up')}
              >
                &uarr;
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                onClick={() => moveItem(index, 'down')}
              >
                &darr;
              </button>
            </div>
            <span className="flex-grow px-2 cursor-pointer" onClick={() => handleEditItem(index)}>
              {item.content}
            </span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              onClick={() => handleDeleteItem(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Markdown Area */}
      <div className="w-3/5 bg-gray-300 p-4">
        <Markdownrender markdown={markdownContent} />
      </div>

      {/* Edit Form */}
      {activeForm && <SimpleForm onSubmit={handleFormSubmit} type={activeForm} />}
    </div>
  )
}

export default Layout
