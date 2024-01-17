/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { marked } from 'marked'

function Markdownrender({ markdown }) {
  const htmlContent = marked(markdown)
  return <div className="a4-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default Markdownrender
