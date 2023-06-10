import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRedirectAfterAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const originalUrl = sessionStorage.getItem('original_url');
        if (originalUrl) {
        sessionStorage.removeItem('original_url');
        router.replace(originalUrl);
        }
    }, [router]);

    const setOriginalUrl = (url: string) => {
        sessionStorage.setItem('original_url', url);
    };

    return { setOriginalUrl };
};
