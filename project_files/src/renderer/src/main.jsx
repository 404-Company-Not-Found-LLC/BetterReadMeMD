import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import Layout from './Layout'
import TestLayout from './TestLayout'

// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestLayout />
    {/* <Layout /> */}
  </React.StrictMode>
)
