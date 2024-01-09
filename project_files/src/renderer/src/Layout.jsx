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

function Layout() {
  return (
    <div className="layout">
      <BlockquoteBtn />
      <br></br>
      <BoldBtn />
      <br></br>
      <CodeBtn />
      <br></br>
      <CodeblockBtn />
      <br></br>
      <EmojiBtn />
      <br></br>
      <HeaderBtn />
      <br></br>
      <ImageBtn />
      <br></br>
      <ItalicsBtn />
      <br></br>
      <ListBtn />
      <br></br>
      <LinkBtn />
      <br></br>
      <TasklistBtn />
      <br></br>
      <TableBtn />
      <br></br>
      <FootnoteBtn />
    </div>
  )
}

export default Layout
