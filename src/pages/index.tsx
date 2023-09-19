import { type NextPage } from 'next';
import { UploadHtmlFile } from '~/components/UploadHtmlFile/UploadHtmlFile';

const Home: NextPage = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <UploadHtmlFile onFileSelect={(data) => console.log(data)} />
      </main>
    </>
  );
};

export default Home;
