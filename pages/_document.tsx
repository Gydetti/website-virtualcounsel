import Document, { Html, Head, Main, NextScript } from "next/document";

// Custom Document required for prerendering static pages like /404
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
