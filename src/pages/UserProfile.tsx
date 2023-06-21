import React, { useEffect, useState } from "react";
import InputField from "../components/ui/InputField/InputField";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import SimpleLink from "../components/ui/SimpleLink/SimpleLink";
import SpecialButton from "../components/ui/SpecialButton/SpecialButton";
import toast from 'react-hot-toast';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
  });
  const [editProfile, setEditProfile] = useState(true);
  const { email, displayName } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = () => {
      Axios.get('http://localhost:4000/api/auth/user', {
        withCredentials: true,
        headers:{
          Accept: '*/*',
         'Content-Type': 'application/json',
      }
      })
        .then(async (resp: any) => {
          const res = await resp.data;
            setFormData({...res.data});
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
          navigate('/signin');
        });
    };
    fetchProfileData();
  }, [navigate])

  const onUpdateData = () => {
    console.log(formData)
    Axios({
      method: "PUT",
      data: { ...formData },
      withCredentials: true,
      url: "http://localhost:4000/api/auth/update-profile",
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
        setEditProfile(true);
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
        <h3>User Profile Data</h3>
        <InputField
          title={"Email Address"}
          id={"email"}
          type={"text"}
          setData={setFormData}
          value={email}
          placeHolder={"Your Email Address"}
          Icon={AiOutlineUser}
          data={formData}
          disabled={editProfile}
        />
        <InputField
          title={"User Name"}
          id={"displayName"}
          type={"text"}
          setData={setFormData}
          value={displayName}
          placeHolder={"User Name"}
          Icon={AiOutlineLock}
          data={formData}
          disabled={editProfile}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '5px'}}>
        <p style={{fontSize: '0.9rem', color: 'red', cursor: 'pointer'}} onClick={() => setEditProfile(!editProfile)}>Edit Profile</p>
          <SimpleLink link={'/changepassword'} title={'Change Password'}/>
        </div>
        <div style={{marginTop: '30px'}}>
          <SpecialButton onClick={onUpdateData} title={'Update Changes'}/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
