import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Top Users</Link>
      <Link to="/trending">Trending Posts</Link>
      <Link to="/feed">Live Feed</Link>
    </nav>
  );
}
