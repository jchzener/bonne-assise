import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

export function Shell({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
