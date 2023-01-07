import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import { Avatar, Breadcrumb, Layout, Menu } from 'antd';
import { Homepage, LoginTemplate, Navbar } from './components';
import { AppstoreOutlined, MailOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { getAuth, removeAuth } from './api';
import FundReport from './components/FundReport';
import Page from './components/Page';
import Customer from './components/Customer';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = getAuth();
  if(!auth){
    return (
      <>
        <LoginTemplate />
      </>
    )
  }

  const logout = () => {
    removeAuth(null);
    window.location.reload(false);
  }

  return (
    <Layout className='h-screen'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Navbar collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
           <Menu mode="horizontal" style={{ float: 'right', width: 'auto'}}>
              <Menu.Item key="notification" icon={<NotificationOutlined />}>
              </Menu.Item>
              <Menu.Item key="mail" icon={<MailOutlined />}>
              </Menu.Item>
              <Menu.SubMenu key="profile" icon={<UserOutlined />}>
                {/* <Menu.Item key="two" icon={<AppstoreOutlined />}>
                  Navigation Two
                </Menu.Item> */}
                <Menu.Item key="logout" icon={<AppstoreOutlined />} onClick={logout}>
                  Sign Out
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }} >
          <div style={{ padding: 10, height: 'calc(100vh - 90px)', overflowY :'auto' }}>
           <Switch>
              <Route exact path="/">
                <FundReport />
              </Route>
              <Route exact path="/sales-reports">
                <Homepage page={'sales'}/>
              </Route>
              <Route exact path="/purchase-reports">
                <Homepage page={'purchase'}/>
              </Route>
              <Route exact path="/sales">
                <Page  page={'sales'} />
              </Route>
              <Route exact path="/purchases">
                <Page  page={'purchase'} />
              </Route>
              <Route exact path="/receipts">
                <Page  page={'receipts'} />
              </Route>
              <Route exact path="/payments">
                <Page  page={'payments'} />
              </Route>
              <Route exact path="/customers">
                <Page page={'customer'}/>
              </Route>
              <Route exact path="/vendors">
                <Page page={'vendor'}/>
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
