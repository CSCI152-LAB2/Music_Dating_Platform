import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav classname="nav">
        <Link to="/" className="Cadence">
            Cadence
        </Link>
        <ul>
            <CustomLink to="/login">Login</CustomLink>
        </ul>
        </nav>
    )
}


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
