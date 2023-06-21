import React, { useState } from "react";
import InputField from "../components/ui/InputField/InputField";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { HiUser, HiUserAdd } from "react-icons/hi";
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import SignButton from "../components/ui/SimpleButton/SignButton";
import SimpleLink from "../components/ui/SimpleLink/SimpleLink";
import SpecialButton from "../components/ui/SpecialButton/SpecialButton";
import IconButton from "../components/ui/IconButton/IconButton";
import toast from 'react-hot-toast';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onSignIn = () => {
    console.log(formData)
    Axios({
      method: "POST",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/local-login",
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
        navigate('/')
      })
      .catch(async (resp: any) => {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "50px",
          }}
        >
          <SignButton
            link={"/signin"}
            title={"Sign in"}
            Icon={HiUser}
            active={true}
          />
          <SignButton
            link={"/signup"}
            title={"Sign up"}
            Icon={HiUserAdd}
            active={false}
          />
        </div>
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
        <InputField
          title={"Password"}
          id={"password"}
          type={"password"}
          setData={setFormData}
          value={password}
          placeHolder={"Your Password"}
          Icon={AiOutlineLock}
          data={formData}
          disabled={false}
        />
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '5px'}}>
          <SimpleLink link={'/forgotpassword'} title={'Forgot Password?'}/>
        </div>
        <div style={{marginTop: '30px'}}>
          <SpecialButton onClick={onSignIn} title={'Sign In'}/>
        </div>
        <p style={{fontSize: '0.7rem', marginTop: '20px', flexWrap: 'nowrap', textAlign: 'center', borderBottom: '1px solid #696880', borderTop: '1px solid #696880'}}>OR</p>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', gap:'3rem'}}>
          <a href="http://localhost:4000/api/auth/google">
          <IconButton Icon={FcGoogle} color={'#922724'} onClick={() => console.log('Google Signin')}/>
          </a>
          <a href="http://localhost:4000/api/auth/github">
          <IconButton Icon={FaGithub} color={'black'} onClick={() => console.log('GIthub Signin')}/>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signin;
