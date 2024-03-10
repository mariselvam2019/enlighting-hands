import React from 'react';
import './App.css';
import { Layout } from 'antd';
import PublicHealthCareCenters from './phc';
const { Header, Content, Footer } = Layout;

function App() {

  return (
    <Layout>
      <Header>
        <div style={{ color: 'white', fontSize: 18 }}>Enlighting Hands</div>
      </Header>
      <Content>
        <PublicHealthCareCenters />
      </Content>
    </Layout>
  );
}

export default App;
