import HotDealsScroll from "../../components/user/hot-deals";
import Hero from "../../components/user/hero";
import Header from "../../layouts/User/header";
const deals = () => {
  return (
    <>
        <Header />
        <Hero />
        <HotDealsScroll />
    </>
  );
}

export default deals;