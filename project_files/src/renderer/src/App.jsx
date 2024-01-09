/* eslint-disable no-unused-vars */
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

import Test from './components/test'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Test />
    </DndProvider>
  )
}

export default App
