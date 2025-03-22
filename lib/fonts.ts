import LocalFont from 'next/font/local'

export const lato = LocalFont({
  src: [
    {
      path: '../assets/fonts/lato/Lato-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato/Lato-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../assets/fonts/lato/Lato-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato/Lato-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/lato/Lato-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato/Lato-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/lato/Lato-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato/Lato-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/lato/Lato-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/lato/Lato-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-lato',
  display: 'swap',
})
