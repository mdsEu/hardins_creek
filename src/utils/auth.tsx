import nextCookie from 'next-cookies';
import Router from 'next/router';


export const validateTokenSSR = async (ctx: any) => {
  const { token } = nextCookie(ctx);

  try {
    if (!token) {
      return redirectOnError(ctx)
    }

    const tokenIsValid = await validate(token);

    if (!tokenIsValid) {
      return redirectOnError(ctx);
    }
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Error: ', error)
    // Implementation or Network error
    return redirectOnError(ctx);
  }

  return {};
}

const redirectOnError = (ctx: any) => {
  /* eslint-disable no-console */
  console.log('Redirecting back to main page')
  if (typeof window !== 'undefined') {
    Router.push('/admin')
  } else {
    ctx.res.writeHead(302, { Location: '/admin' })
    ctx.res.end()
  }
}



const validate = async (token: string) => {
  if (token) {
    const url = typeof window !== 'undefined' ? window.location.origin : `${process.env.NEXT_PUBLIC_APP_URL}:8080`;

    const request = await fetch(`${url}/api/users/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (request.status === 200) {
      const user = await request.json();

      if (!user.errorMessage) {
        return true;
      }
    }
  }

  return false;
}
