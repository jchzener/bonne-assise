import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

export function Shell({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
