import React, { useState } from "react";
import InputField from "../components/ui/InputField/InputField";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { HiUser, HiUserAdd } from "react-icons/hi";
import SignButton from "../components/ui/SimpleButton/SignButton";
import SpecialButton from "../components/ui/SpecialButton/SpecialButton";
import IconButton from "../components/ui/IconButton/IconButton";
import { FcGoogle } from "react-icons/fc";
import { CgNametag } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import Axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    displayName: '',
    password: "",
  });
  const { email, password, displayName } = formData;
  const navigate = useNavigate();

  const onSignup = () => {
    console.log(formData)
    Axios({
      method: "POST",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/local-signup",
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
        alignItems: "center",
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
            active={false}
          />
          <SignButton
            link={"/signup"}
            title={"Sign up"}
            Icon={HiUserAdd}
            active={true}
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
          title={"User Name"}
          id={"displayName"}
          type={"text"}
          setData={setFormData}
          value={displayName}
          placeHolder={"Your User Name"}
          Icon={CgNametag}
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
        <div style={{marginTop: '30px'}}>
          <SpecialButton onClick={onSignup} title={'Sign up'}/>
        </div>
        <p style={{fontSize: '0.7rem', marginTop: '20px', flexWrap: 'nowrap', textAlign: 'center'}}>Dont have an account? Please sign up!<br /> OR <br/ > use your google/github account</p>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', gap:'3rem'}}>
        <a href="http://localhost:4000/api/auth/google">
          <IconButton Icon={FcGoogle} color={'#922724'} onClick={() => console.log('Google Signin')}/>
          </a>
          <a href="http://localhost:4000/api/auth/github">
          <IconButton Icon={FaGithub} color={'black'} onClick={() => console.log('Github Signin')}/>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
