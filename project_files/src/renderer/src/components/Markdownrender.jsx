import React from 'react'
import { marked } from 'marked'

function Markdownrender({ markdown }) {
  const htmlContent = marked(markdown)
  return <div className="a4-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default Markdownrender
