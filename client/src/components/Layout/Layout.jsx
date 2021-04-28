
export default function Layout(props) {

  const {currentUser, handleLogout} = props
  return (
    <div>
      {props.children}
    </div>
  )
}
