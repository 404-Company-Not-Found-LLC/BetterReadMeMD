import { useDrop } from 'react-dnd'

function test({ onDrop }) {
  // The useDrop hook takes a specification object and returns collected properties and a ref to assign to the drop target
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'ITEM_TYPE', // Replace 'ITEM_TYPE' with the type of the draggable items that this target accepts
    drop: (item, monitor) => {
      // Optional: handle the drop action, 'item' is the draggable item's information
      onDrop && onDrop(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Boolean indicating whether a draggable item is hovering over this target
      canDrop: monitor.canDrop() // Boolean indicating whether the dragged item is acceptable
    })
  })

  // Styles or class names can be conditionally applied based on 'isOver' and 'canDrop'
  let backgroundColor = '#fff'
  if (isOver) backgroundColor = '#f7f7f7'
  if (canDrop) backgroundColor = '#e7e7e7'

  return (
    <div
      ref={dropRef}
      style={{ backgroundColor, minHeight: '100px', padding: '10px', border: '1px dashed gray' }}
    >
      {isOver && canDrop ? 'Release to drop' : 'Drag an item here'}
    </div>
  )
}

export default test
