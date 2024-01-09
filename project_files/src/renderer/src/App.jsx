import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>{/* Your drag-and-drop components here */}</DndProvider>
  )
}
