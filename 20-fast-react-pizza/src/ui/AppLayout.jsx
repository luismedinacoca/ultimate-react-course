import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>AppLayout Content</h1>
        <p>************************************************</p>
        <Outlet />
        <p>************************************************</p>
      </main>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
