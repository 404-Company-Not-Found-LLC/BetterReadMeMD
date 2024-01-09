import { useDrag } from 'react-dnd'

function Test() {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'button', // Define a unique type for the draggable item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  // You can change the style based on whether the item is being dragged
  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    padding: '10px',
    margin: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  }

  return (
    <button ref={dragRef} style={style}>
      Draggable Button
    </button>
  )
}

export default Test
