import "./globals.css";


export default function Layout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mukul Store</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}