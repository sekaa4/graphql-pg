import { Avatar, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/app/components/FireBase';
import { DescDeveloper1 } from '@/features/SideBar';
import cls from '@/pages/index.module.scss';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Sidebar } from '@/widgets/layouts/side-bar';

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation('common');

  return (
    <>
      <LangSwitcher />
      <Sidebar />

      {!user ? (
        <div className={cls.auth_container}>
          <Link href="/auth/signIn">
            <Button variant="contained">SignIn</Button>
          </Link>

          <Link href="/auth/signUp">
            <Button variant="contained">SignUp</Button>
          </Link>
        </div>
      ) : (
        <div className={cls.auth_container}>
          <Link href="/main">
            <Button variant="contained"> Go to Main Page</Button>
          </Link>
        </div>
      )}

      <h1>{t('Welcome')}</h1>

      <ul>
        <li>
          <Avatar
            alt="Pavel Demuskov"
            src="https://avatars.githubusercontent.com/u/99259052?s=400&u=967b7f7b9f97e38ba68065bc08056325bed8e1f7&v=4"
          />
          <DescDeveloper1 />
        </li>
        <li>
          <Avatar
            alt="Sergey Pansevich"
            src="https://avatars.githubusercontent.com/u/106100393?v=4"
          />
        </li>
        <li>
          <Avatar alt="Anton" src="https://avatars.githubusercontent.com/u/72494592?v=4" />
        </li>
      </ul>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Welcome;
