/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'

const Markdown = ({ content }) => {
  // Render markdown content. You can use a library like 'marked' for markdown rendering
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default Markdown

