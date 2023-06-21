import React, { useState } from "react";
import InputField from "../components/ui/InputField/InputField";
import { AiOutlineUser } from "react-icons/ai";
import SpecialButton from "../components/ui/SpecialButton/SpecialButton";
import toast from 'react-hot-toast';
import Axios from 'axios';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onClick = () => {
    console.log(formData)
    Axios({
      method: "POST",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/local-forgotpassword",
    })
      .then(async (resp: any) => {
        const res = await resp.data;
        toast.success(`${res.message}`, {
          duration: 3000,
          position: "bottom-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      })
      .catch(async (resp: any) => {
        console.log(resp)
        const res = await resp.response.data;
        toast.error(`${res.message}`, {
          duration: 3000,
          position: "bottom-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      });
  }

  return (
    <div style={{backgroundImage: 'url(/assets/bg01.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        minHeight: "100vh",
        maxWidth: "1150px",
        margin: "0 auto",
        gap: "5rem",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "1rem",
          backgroundColor: 'white',
          margin: '50px',
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <h3>Forgot Password:</h3>
        <InputField
          title={"Email Address"}
          id={"email"}
          type={"text"}
          setData={setFormData}
          value={email}
          placeHolder={"Your Email Address"}
          Icon={AiOutlineUser}
          data={formData}
          disabled={false}
        />
        <div style={{marginTop: '30px'}}>
          <SpecialButton onClick={onClick} title={'Send Email'}/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
