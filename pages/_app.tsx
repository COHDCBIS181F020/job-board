import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { JobProvider } from '../context/JobContext';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JobProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </JobProvider>
  );
}
