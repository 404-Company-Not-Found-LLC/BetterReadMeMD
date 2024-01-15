function Popup({ type, onClose }) {
  let content

  switch (type) {
    case 'codeblock':
      content = (
        <div>
          Form fields for codeblock
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'blockquote':
      content = <div>Form fields for blockquote</div>
      break
    case 'bold':
      content = (
        <div>
          Form fields for bold
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'italics':
      content = (
        <div>
          Form fields for italics
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'link':
      content = (
        <div>
          Form fields for link
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'image':
      content = (
        <div>
          Form fields for image
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'code':
      content = (
        <div>
          Form fields for code
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'header':
      content = (
        <div>
          Form fields for header
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'list':
      content = (
        <div>
          Form fields for list
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'tasklist':
      content = (
        <div>
          Form fields for tasklist
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'table':
      content = (
        <div>
          Form fields for table
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'footnote':
      content = (
        <div>
          Form fields for footnote
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    case 'emoji':
      content = (
        <div>
          Form fields for emoji
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
      break
    // ... other cases for different buttons
    default:
      content = <div>Default Popup Content</div>
  }

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="popup">
        {content}
        <button>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  )
}

export default Popup
