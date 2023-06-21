import { useState } from "react";
import "./App.css";
import Axios from "axios";

type Response = {
  success: number;
  message: string;
  data: null | {
    displayName: string;
    role: string;
    email?: string;
    password?: string;
    googleId?: string;
    passwordResetToken?: string;
    profilePicture?: string;
  };
};

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formDataTwo, setFormDataTwo] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [loginResponse, setLoginResponse] = useState<Response | null>(null);
  const [logoutResponse, setLogoutResponse] = useState<Response | null>(null);
  const [passResponse, setPassResponse] = useState<Response | null>(null);

  const onLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/local-login",
    })
      .then(async (resp) => {
        const res = await resp.data;
        setLoginResponse(res);
      })
      .catch(async (resp) => {
        console.log(resp)
        const res = await resp.response.data;
        setLoginResponse(res);
      });
  };

  const onLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/api/auth/logout",
    }).then(async (resp) => {
      const res = await resp.data;
      setLogoutResponse(res);
    })
    .catch(async (resp) => {
      console.log(resp)
      const res = await resp.response.data;
      setPassResponse(res);
    });
  };

  const onChangePassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Axios({
      method: "POST",
      withCredentials: true,
      data: { ...formDataTwo },
      url: "http://localhost:4000/api/auth/local-changepassword",
    }).then(async (resp) => {
      const res = await resp.data;
      setPassResponse(res);
    })
    .catch(async (resp) => {
      console.log(resp)
      const res = await resp.response.data;
      setPassResponse(res);
    });;
  };

  return (
    <>
      <form>
        <p>Email</p>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
        <p>Password</p>
        <input
          type="text"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
        <button onClick={onLogin}>Login</button>
        <button onClick={onLogout}>Logout</button>
      </form>
      {loginResponse && <p>{loginResponse.message}</p>}
      {logoutResponse && <p>{logoutResponse.message}</p>}
      <form>
        <p>Email</p>
        <input
          type="text"
          id="email"
          value={formDataTwo.email}
          onChange={(e) =>
            setFormDataTwo({ ...formDataTwo, [e.target.id]: e.target.value })
          }
        />
        <p>Password</p>
        <input
          type="text"
          id="password"
          value={formDataTwo.password}
          onChange={(e) =>
            setFormDataTwo({ ...formDataTwo, [e.target.id]: e.target.value })
          }
        />
        <p>New Password</p>
        <input
          type="text"
          id="newPassword"
          value={formDataTwo.newPassword}
          onChange={(e) =>
            setFormDataTwo({ ...formDataTwo, [e.target.id]: e.target.value })
          }
        />
        <button onClick={onChangePassword}>Change Password</button>
      </form>
      {passResponse && <p>{passResponse.message}</p>}
    </>
  );
}

export default App;
