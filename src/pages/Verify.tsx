import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email] = useState(location.state);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return <div>Verify</div>;
}
