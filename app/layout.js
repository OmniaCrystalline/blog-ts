/** @format */
import "./globals.css";
import AuthProvider from "@/utils/providers/AuthProvider";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const metadata = {
  title: "Create Your First Blog",
  description: "Write your own blog, select your oun theme",
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
      <body>
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
