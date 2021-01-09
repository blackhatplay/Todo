import Main from '../components/MainContent';
import Header from "../components/Header";
import Head from 'next/head';


const index = () => {
  return (
    <>
      <Head>
        <title>Todo</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header />
      <Main />
    </>
  );
};

export default index;
