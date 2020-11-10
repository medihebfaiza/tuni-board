import { Nav } from 'react-bootstrap' 
import {ReactComponent as Brand} from './assets/brand.svg'

function Navbar() {
  return (
    <Nav className="container" activeKey="/home">
      <Nav.Item>
        {/*<span className="ml-5 display-4">TuniBoard</span>*/}
      </Nav.Item>
    </Nav>
  )
}

export default Navbar