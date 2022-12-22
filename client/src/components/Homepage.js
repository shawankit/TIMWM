import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';

const Homepage = () => {

  return (
  <>
      <Breadcrumb style={{ margin: '16px 0'}} className="text-4xl font-bold">
        <Breadcrumb.Item>Reports</Breadcrumb.Item>
      </Breadcrumb>
  </>   
  );
};

export default Homepage;



