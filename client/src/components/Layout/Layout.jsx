import {Link} from 'react-router-dom'
export default function Layout(props) {

  return (
    <div>
      <Link to="/"> Adnat </Link>
      {props.children}
    </div>
  )
}
