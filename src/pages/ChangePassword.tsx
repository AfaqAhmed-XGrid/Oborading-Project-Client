import React, { useState } from "react";
import InputField from "../components/ui/InputField/InputField";
import { AiOutlineUser } from "react-icons/ai";
import SpecialButton from "../components/ui/SpecialButton/SpecialButton";
import toast from 'react-hot-toast';
import Axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  const { password, newPassword } = formData;

  const onChangePassword = () => {
    console.log(formData)
    Axios({
      method: "PUT",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/local-changepassword",
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
        <h2>Forget Password:</h2>
        <InputField
          title={"Old Password"}
          id={"password"}
          type={"text"}
          setData={setFormData}
          value={password}
          placeHolder={"Your old password"}
          Icon={AiOutlineUser}
          data={formData}
          disabled={false}
        />
        <InputField
          title={"New Password"}
          id={"newPassword"}
          type={"text"}
          setData={setFormData}
          value={newPassword}
          placeHolder={"Your new password"}
          Icon={AiOutlineUser}
          data={formData}
          disabled={false}
        />
        <div style={{marginTop: '30px'}}>
          <SpecialButton onClick={onChangePassword} title={'Change Password'}/>
        </div>
        <p style={{color: 'gray', fontSize: '0.8rem', textAlign: 'justify'}}>Note: If you created account by using google or github and trying to change the password first time, you can leave the old password blank!</p>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
