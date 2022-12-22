import React from "react";
import OtpInput from "../lib/react-otp-input";
import Text from "../atoms/Text";

const OtpComponent = ({ onChange, otpValue, length, errorMessage }) => {
  return (
    <div className="otp">
      <OtpInput
        isInputNum={true}
        value={otpValue}
        onChange={(otp) => {
          onChange(otp);
        }}
        numInputs={length}
        hasErrored={errorMessage?.length > 0}
        placeholder={false}
        containerStyle={{
          fontSize: "16px",
          color: "black",
        }}
        inputStyle={{
          width: 42,
          height: 48,
          border: "1px solid #E5E5EB",
          marginRight: 16,
          borderRadius: "7px",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "28px",
        }}
        focusStyle={{
          outline: "none",
          border: "1px solid #9C9CAF",
          color: "#14142B",
        }}
        errorStyle={{
          border: "1px solid #E64C4C",
          color: "#E64C4C",
        }}
        shouldAutoFocus={true}
      />
      {errorMessage && (
        <Text className="text-xs font-light text-error mt-1">
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default OtpComponent;
