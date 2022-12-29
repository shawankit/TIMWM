import React, { useState } from "react";
import { setAuth, userLogin, userSession } from "../api";
import LoginContent from "./loginContent";
import LoginForm from "./loginForm";
import OtpScreen from "./otpScreen";

const LoginTemplate = ({}) => {

  const [apiError, setApiError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    step: 1,
    mobileNumber: ""
  });
  
  const handleGetOTP = async (data) => {
    const res = await userLogin(data.mobileNumber);
    if (res.data.status) {
      setLoginDetails({
        step: 2,
        mobileNumber: data.mobileNumber
      });
      setApiError([]);
    } else {
      setApiError(res.data.message);
    }
  };

  const handleLogin = async (otp) => {
    if (otp.length == 4) {
      const res = await userSession(
        loginDetails.mobileNumber,
        otp,
        loginDetails.countryCode
      );
      console.log(res)
      if (res.data.status) {
        setAuth({
          id: res.data.entity.id,
          token: res.data.entity.token
        });
        window.location.reload(false);
      } else {
        setApiError(res.data.message);
      }
    }
  };

  const resendOtp = async () => {
    await userLogin(loginDetails.mobileNumber);
  };

  const editMobile = () => {
    setApiError([]);
    setLoginDetails((prevState) => {
      return { ...prevState, step: 1 };
    });
  };

  const renderSwitch = () => {
    switch (loginDetails.step) {
      case 1:
        return (
          <LoginForm
            onSubmit={handleGetOTP}
            loginDetails={loginDetails}
            apierror={apiError}
            defaultValues={{ mobileNumber: loginDetails.mobileNumber }}
          />
        );
      case 2:
        return (
          <OtpScreen
            handleLogin={handleLogin}
            loginDetails={loginDetails}
            editMobile={editMobile}
            resendOtp={resendOtp}
            error={apiError}
          />
        );
    }
  };
  return (
    <div className="flex flex-wrap md:flex-nowrap">
      <div className="w-full md:w-55/100 shrink-0">
        <LoginContent />
      </div>
      <div className="w-full md:w-45/100">{renderSwitch()}</div>
    </div>
  );
};
export default LoginTemplate;
