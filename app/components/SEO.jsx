import Head from "next/head";

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = "website",
  author = "Mukul Store",
  twitterHandle = "@mukulstore",
  price,
  availability
}) => {
  const siteName = "Mukul Store"
  const defaultImage = "/logo.png";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mukulstore.com";

  return (
    <Head>
      {/* Temel META Etiketleri */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={`${baseUrl}${url}`} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Ürün Sayfaları için Ek META Etiketleri */}
      {type === "product" && price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content="TRY" />
          {availability && (
            <meta property="product:availability" content={availability} />
          )}
        </>
      )}
    </Head>
  );
};

export default SEO;
