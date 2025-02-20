import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/admin", {
          headers: { Authorization: token },
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Accès refusé");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default AdminPage;
