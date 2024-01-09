function Popup({ type, onClose }) {
  let content

  switch (type) {
    case 'codeblock':
      content = (
        <div>
          Form fields for Codeblock
          <form>
            <input></input>
          </form>
        </div>
      )
      break
    case 'blockquote':
      content = <div>Form fields for Blockquote</div>
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
        <button onClick={onClose}>Close</button>
      </div>
    </>
  )
}

export default Popup
