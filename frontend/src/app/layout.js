import "./globals.css";

export const metadata = {
  title: "The SUITES LLC",
  description: "Luxury hotel and suite booking website for The SUITES LLC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background font-sans text-on-surface">
        {children}
      </body>
    </html>
  );
}
