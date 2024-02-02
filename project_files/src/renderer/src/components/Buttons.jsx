/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import update from 'immutability-helper' // npm install immutability-helper
import { v4 as uuidv4 } from 'uuid' // npm install uuid
import 'tailwindcss/tailwind.css'

function Buttons({ setSelectedButton }) {
  return (
    <div className="flex flex-col space-y-2">
      <button onClick={() => setSelectedButton('heading')}>Add Heading</button>
      <button onClick={() => setSelectedButton('code')}>Add Code</button>
      <button onClick={() => setSelectedButton('x')}>Add X</button>
    </div>
  )
}

export default Buttons
