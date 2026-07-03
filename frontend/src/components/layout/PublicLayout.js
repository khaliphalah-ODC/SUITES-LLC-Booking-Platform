import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function PublicLayout({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
