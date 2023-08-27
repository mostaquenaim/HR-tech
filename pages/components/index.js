import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexCheck () {

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('email');
    console.log(session)

    if (session) {
      router.push('/deliveryman/updateProfile');
    }
    else{
      router.push('/deliveryman/login');
    }
    
  }, []);

  return null;
};

