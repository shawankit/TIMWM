import React from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import icon from '../images/cryptocurrency.png';
import bg from '../images/login-bg.jpg';

const LoginContent = ({ loginContentHeading, loginContentDesc }) => {
  return (
    <div className="md:min-h-screen relative p-6 py-8 md:py-16 md:px-9 overflow-hidden bg-gradient-secondary md:bg-transparent">
      <div className="relative z-10 max-w-md">
        <img src={icon} width="170" height="34" alt="logo" />
        <Heading
          type="h3"
          className="text-2xl md:text-3xl md:mt-24 mt-5 mb-4 text-white"
        >
          {loginContentHeading}
        </Heading>
        <Text className="text-white">{loginContentDesc}</Text>
      </div>

      <div className="hidden md:block min-h-screen absolute w-full h-full top-0 left-0 z-0 login-bg">
        <img
          src={bg}
          layout="fixed"
          objectFit="cover"
          width="1024"
          height="1024"
          alt="login bg"
        />
      </div>
    </div>
  );
};
export default LoginContent;
