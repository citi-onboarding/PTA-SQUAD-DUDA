import "../styles/globals.css";
import TopBar from "../components/TopBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="pt-[70px]"> 
        <TopBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
