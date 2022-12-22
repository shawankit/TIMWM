import React, { useState, useCallback, useEffect } from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import OtpComponent from "./OtpComponent";
import { EditOutlined } from "@ant-design/icons";

const OtpScreen = ({
  handleLogin,
  loginDetails,
  editMobile,
  resendOtp,
  error,
}) => {
  const [otp, setOtp] = useState("");

  //timer logic
  const [timer, setTimer] = useState(30);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );
  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(30);
    }
  };

  //events
  const onClickLogin = (event) => {
    event.preventDefault();
    handleLogin(otp);
  };
  const handelResendOtp = () => {
    resetTimer();
    resendOtp();
  };
  return (
    <div className="md:min-h-screen bg-white flex items-center px-6 py-14 lg:pl-20 lg:pr-30">
      <form onSubmit={onClickLogin}>
        <Heading type="h4" className="mb-2 md:mb-8 font-medium">
          Enter verification code
        </Heading>
        <div className="mb-8 md:mb-9">
          <Text>
            We have just sent verification code to{" "}
            <span className="font-bold">{`${loginDetails.mobileNumber}`}</span>
            <span className="ml-1">
              <EditOutlined onClick={editMobile} />
            </span>
          </Text>
        </div>
        <OtpComponent
          onChange={setOtp}
          otpValue={otp}
          length={4}
          errorMessage={error}
        />
        {timer > 0 && (
          <Text className="my-8 md:my-11 text-sm text-gray-600 font-light">
            Resend OTP in{" "}
            <span className="text-gray-900 font-bold">{timer}s</span>
          </Text>
        )}
        {timer == 0 && (
          <div onClick={handelResendOtp}>
            <Text className="text-primary-900 my-8 md:my-11 cursor-pointer">
              Send the code again
            </Text>
          </div>
        )}

        <Button
          variant="primaryBtn"
          fontWeight="font-bold"
          btnClass="w-full"
          disabled={otp.length != 4}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default OtpScreen;

