import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import Reports from './Reports';

const Homepage = ({ page }) => {

  return (
  <>
      <Breadcrumb style={{ margin: '16px 0'}} className="text-4xl font-bold">
        <Breadcrumb.Item>{page == 'sales'? 'Sales' : 'Purchase'} Report</Breadcrumb.Item>
      </Breadcrumb>
      <Reports page={page}/>
  </>   
  );
};

export default Homepage;



