import { type NextPage } from 'next';
import { UploadHtmlFile } from '~/components/UploadHtmlFile/UploadHtmlFile';
import { signIn, signOut, useSession } from 'next-auth/react';
import { PrimaryButton } from '~/components/Button/Buttons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import Form from '~/components/Form/Form';
import { useNotesStore } from '~/store/notesStore';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { responseFromOpenAi } = useNotesStore();
  if (status === 'loading') {
    return <main>Loading...</main>;
  }
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        {session ? (
          <>
            <p className="dark:text-white">hi {session.user?.name}</p>
            <PrimaryButton
              color={'red'}
              icon={faSignOut}
              onClick={() => {
                signOut().catch(console.log);
              }}
            >
              Logout
            </PrimaryButton>
          </>
        ) : (
          <PrimaryButton
            icon={faDiscord}
            onClick={() => {
              signIn('discord').catch(console.log);
            }}
          >
            Login
          </PrimaryButton>
        )}
        <UploadHtmlFile onFileSelect={(data) => console.log(data)} />
        {responseFromOpenAi.word.length ? (
          <Form defaultValuesProp={responseFromOpenAi} />
        ) : null}
      </main>
    </>
  );
};

export default Home;
