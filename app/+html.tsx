import { ScrollViewStyleReset } from 'expo-router/html';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="copyright" content="Michał Wieczorek" />
        <meta name="author" content="Michał Wieczorek, mwiemszra@gmail.com" />
        <meta name="language" content="EN" />
        <meta name="robots" content="index,follow" />
        <meta name="description" content="" />
        <meta name="og:description" content="" />
        <meta name="keywords" content="" />
        <meta name="pagename" content="PrintSpot" />
        <meta name="og:site_name" content="PrintSpot" />
        <meta name="og:title" content="PrintSpot |" />
        <title>PrintSpot |</title>
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} /> {/* Responsive background color */}
        <ScrollViewStyleReset /> {/* Disable scroll for the whole page */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
