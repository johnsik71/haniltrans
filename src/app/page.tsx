import HomeDesktop from '@/components/home/HomeDesktop';
import HomeMobile from '@/components/home/HomeMobile';
import CartDrawer from '@/components/shop/CartDrawer';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <HomeDesktop />
      </div>
      <div className="block md:hidden">
        <HomeMobile />
      </div>
      <CartDrawer />
      <Footer />
    </>
  );
}
