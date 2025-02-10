/** @format */
import "./globals.css";
import AuthProvider from "@/utils/providers/AuthProvider";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";
import Footer from '../components/Footer'


export const metadata = {
  title: "Create Your First Blog",
  description: "Write your own blog, select your oun theme",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
