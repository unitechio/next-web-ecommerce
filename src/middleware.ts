import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Matcher ignoring `/_next/`, `/api/` and files with extensions
    matcher: ['/((?!api|_next|static|public|_vercel|.*\\..*).*)']
};
