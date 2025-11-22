/** @format */
import "./globals.css";
import AuthProvider from "@/utils/providers/AuthProvider";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Create Your First Blog";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: "Write your own blog, select your own theme",
  icons: {
    icon: [
      { url: "/pen-svgrepo-com.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    shortcut: "/pen-svgrepo-com.svg",
    apple: "/pen-svgrepo-com.svg",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName,
    description: "Write your own blog, select your own theme",
    type: "website",
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: "/preview.webp",
        width: 1200,
        height: 630,
        alt: "Blog Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "Write your own blog, select your own theme",
    images: ["/preview.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/pen-svgrepo-com.svg' type='image/svg+xml' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='apple-touch-icon' href='/pen-svgrepo-com.svg' />
        <meta name='theme-color' content='#000000' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='container px-5 ml-auto mr-auto grid min-h-screen max-w-6xl min-w-sm transition-all grid-rows-[auto_1fr_auto] dark'>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
