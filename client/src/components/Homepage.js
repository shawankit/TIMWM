import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import Reports from './Reports';

const Homepage = () => {

  return (
  <>
      <Breadcrumb style={{ margin: '16px 0'}} className="text-4xl font-bold">
        <Breadcrumb.Item>Sales Reports</Breadcrumb.Item>
      </Breadcrumb>
      <Reports />
  </>   
  );
};

export default Homepage;



