/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Markdownrender from './components/Markdownrender'
import Popup from './components/Popup'

function Layout() {
  //const [markdown, setMarkdown] = useState('')
  const [markdown, setMarkdown] = useState('## Hello Markdown\nThis is a test.')
  const [activePopup, setActivePopup] = useState(null)

  const openPopup = (type) => {
    setActivePopup(type)
  }

  const closePopup = () => {
    setActivePopup(null)
  }

  return (
    <div className="layout">
      <div className="button-container">
        <button onClick={() => openPopup('codeblock')}>CodeblockBtn</button>
        <button onClick={() => openPopup('blockquote')}>BlockquoteBtn</button>
        <button onClick={() => openPopup('bold')}>BoldBtn</button>
        <button onClick={() => openPopup('italics')}>ItalicsBtn</button>
        <button onClick={() => openPopup('link')}>LinkBtn</button>
        <button onClick={() => openPopup('image')}>ImageBtn</button>
        <button onClick={() => openPopup('code')}>CodeBtn</button>
        <button onClick={() => openPopup('header')}>HeaderBtn</button>
        <button onClick={() => openPopup('list')}>ListBtn</button>
        <button onClick={() => openPopup('tasklist')}>TasklistBtn</button>
        <button onClick={() => openPopup('table')}>TableBtn</button>
        <button onClick={() => openPopup('footnote')}>FootnoteBtn</button>
        <button onClick={() => openPopup('emoji')}>EmojiBtn</button>
      </div>
      <div className="markdown-container">
        <Markdownrender markdown={markdown} />
      </div>
      {activePopup && <Popup type={activePopup} onClose={closePopup} />}
    </div>
  )
}

export default Layout
