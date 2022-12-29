import React, { useEffect, useState } from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import InputLabel from "../atoms/InputLabel";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";

const LoginForm = ({
  loginDetails,
  onSubmit,
  apierror
}) => {
  const [disabled, setDisabled] = useState(
    loginDetails.mobileNumber.length != 10
  );

  const [error, setError] = useState(apierror);
  const handleMobileNumberChange = (event) => {
    const val = event.target.value.toString();
    if (val.length == 10) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
    setError('');
  };
  useEffect(() => {
    setError(apierror);
  }, [apierror])
  console.log('error', error)

  return (
    <div className="md:min-h-screen flex items-center px-6 py-14 bg-white lg:pl-20 lg:pr-32">
      <div className="w-full max-w-md">
        <Heading type="h4" className="mb-2 md:mb-8 font-medium">
          Login
        </Heading>
        <Text className="mb-6">
          Enter your details to get sign in to your account
        </Text>
        <form onSubmit={(e) => {
          e.preventDefault();
          const mobileNumber =  e.target[0].value;
          console.log(mobileNumber.length, 'mobileNumber')
           if (mobileNumber.length != 10) {
            setError('Please enter valid mobile number');
            return;
          }
          onSubmit({ mobileNumber })
        }}>
          <InputLabel textColor="text-gray-700">Mobile Number</InputLabel>

          <div className="mt-2 flex">
            <InputField
              id="mobileNumber"
              name="mobileNumber"
              type="number"
              className="ml-1 rounded-none mb-0"
              placeholder="Mobile Number"
              maxLength={10}
              isRequired={true}
              onChangeValue={handleMobileNumberChange}
              variant={"outlineBottom"}
            />
            
          </div>
          {error && error.length != 0 && (
              <div className="text-sm text-red-700 -mt-5 mb-1">
                {error.length != 0 && error}
              </div>
            )}
          <Text className="mb-16 md:mb-10 text-sm text-gray-500">
            {/* An OTP will be sent via sms to verify your phone number */}
            Proceed To Enter PIN
          </Text>
          <Button
            type="submit"
            variant="primaryBtn"
            fontWeight="font-bold"
            btnClass="w-full"
          >
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
