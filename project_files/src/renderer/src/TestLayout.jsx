/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper' // npm install immutability-helper
import Markdown from './components/Markdownrender' // Import your Markdown component
import { v4 as uuidv4 } from 'uuid' // npm install uuid
import 'tailwindcss/tailwind.css'
import Buttons from './components/Buttons'
import PopupForm from './components/PopupForm'

function TestLayout() {
  const [selectedButton, setSelectedButton] = useState(null)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Button Area */}
        <div className="w-1/6 p-4">
          <Buttons setSelectedButton={setSelectedButton} />
        </div>

        {/* Draggable Items Area */}
        <div className="w-1/3 bg-gray-200 p-4"></div>

        {/* Markdown Display Area */}
        <div className="w-1/2 bg-gray-300 p-4">
          <PopupForm selectedButton={selectedButton} />
        </div>
      </div>
    </DndProvider>
  )
}

export default TestLayout
