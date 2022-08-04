import Footer from '../components/footer/Footer';
import NavBar from '../components/navs/NavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <NavBar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
