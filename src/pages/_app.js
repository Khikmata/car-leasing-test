import '@/styles/globals.scss';
import localFont from '@next/font/local';

const fonts = localFont({
  src: [
    {
      path: '../fonts/Gilroy/Gilroy-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy/Gilroy-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy/Gilroy-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Nekst/Nekst-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Nekst/Nekst-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
})

export default function App({ Component, pageProps }) {
  return (
    <div className={fonts.className}>
      <Component {...pageProps} />
    </div>
  )
}
