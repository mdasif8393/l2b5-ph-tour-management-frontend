import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>You are not authorized</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
