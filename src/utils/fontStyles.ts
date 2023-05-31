import localFont from 'next/font/local';

export const myFont = localFont({ src: [
        {
        path: '../assets/fonts/Graphik-Regular.woff2',
        weight: '400',
        style: 'normal',
        },
        {
        path: '../assets/fonts/Graphik-Medium.woff2',
        weight: '400',
        style: 'italic',
        },
        {
        path: '../assets/fonts/Graphik-Semibold.woff2',
        weight: '700',
        style: 'normal',
        }
] 
});