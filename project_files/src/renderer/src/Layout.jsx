import React, { useState } from 'react'

import BlockquoteBtn from './components/buttons/BlockquoteBtn'
import BoldBtn from './components/buttons/BoldBtn'
import CodeBtn from './components/buttons/codeBtn'
import CodeblockBtn from './components/buttons/CodeblockBtn'
import EmojiBtn from './components/buttons/emojiBtn'
import HeaderBtn from './components/buttons/HeaderBtn'
import ImageBtn from './components/buttons/ImageBtn'
import ItalicsBtn from './components/buttons/ItalicsBtn'
import ListBtn from './components/buttons/ListBtn'
import LinkBtn from './components/buttons/LinkBtn'
import TasklistBtn from './components/buttons/tasklistBtn'
import TableBtn from './components/buttons/tableBtn'
import FootnoteBtn from './components/buttons/footnoteBtn'

import Markdownrender from './components/Markdownrender'

function Layout() {
  //const [markdown, setMarkdown] = useState('')
  const [markdown, setMarkdown] = useState('## Hello Markdown\nThis is a test.')

  return (
    <div className="layout">
      <div className="button-container">
        <BlockquoteBtn />
        <BoldBtn />
        <CodeBtn />
        <CodeblockBtn />
        <EmojiBtn />
        <HeaderBtn />
        <ImageBtn />
        <ItalicsBtn />
        <ListBtn />
        <LinkBtn />
        <TasklistBtn />
        <TableBtn />
        <FootnoteBtn />
      </div>
      <div className="markdown-container">
        <Markdownrender markdown={markdown} />
      </div>
    </div>
  )
}

export default Layout
