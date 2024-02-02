/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import update from 'immutability-helper' // npm install immutability-helper
import { v4 as uuidv4 } from 'uuid' // npm install uuid
import 'tailwindcss/tailwind.css'

function PopupForm({ selectedButton }) {
  return (
    <div className="flex flex-col space-y-2">
      {selectedButton === 'heading' && (
        <div>
          <h1>Add Heading Form</h1>
          <input type="text" />
          <select>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
          </select>
          {/* Render your Heading form here */}
        </div>
      )}
      {selectedButton === 'code' && (
        <div>
          <h1>Add Code Form</h1>
          <textarea type="text" />
          {/* Render your Code form here */}
        </div>
      )}
      {selectedButton === 'x' && (
        <div>
          <h1>Add X Form</h1>
          {/* Render your X form here */}
        </div>
      )}
    </div>
  )
}

export default PopupForm
