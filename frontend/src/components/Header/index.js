import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
    <nav className="nav-container">
      <h1 className='employee-details'>Employee Details</h1>
      <ul className="list-container">
        <li>
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li>
          <Link className="nav-link" to="/employeeform">Employee Form</Link>
        </li>
      </ul>
  </nav>
)

export default Header