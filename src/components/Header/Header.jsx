import { useContext, useState } from "react";
import Moon from "../../assets/icons/moon.svg";
import Sun from "../../assets/icons/sun.svg";
import Logo from "../../assets/logo.svg";
import Ring from "../../assets/ring.svg";
import shoppingCart from "../../assets/shopping-cart.svg";
import { MovieContext, ThemContext } from "../../context";
import CartDetails from "../Cine/CartDetails";
export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const { cartData } = useContext(MovieContext);
  console.log(cartData);
  const { darkMode, setDarkMode } = useContext(ThemContext);

  const handleCartShow = () => {
    setShowCart(true);
  };

  const handleCartClose = () => {
    setShowCart(false);
  };
  return (
    <>
      {showCart && (
        <CartDetails onClose={handleCartClose} cartData={cartData} />
      )}
      <header>
        <nav className="container flex items-center justify-between space-x-10 py-6">
          <a href="index.html">
            <img src={Logo} width="139" height="26" alt="" />
          </a>

          <ul className="flex items-center space-x-5">
            <li>
              <a
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
              >
                <img src={Ring} width="24" height="24" alt="" />
              </a>
            </li>
            <li>
              <a
                onClick={() => setDarkMode((darkMode) => !darkMode)}
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
              >
                <img
                  src={darkMode ? Sun : Moon}
                  width="24"
                  height="24"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a
                onClick={handleCartShow}
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
              >
                <img src={shoppingCart} width="24" height="24" alt="" />
                {cartData.length > 0 && (
                  <span className="rounded-full absolute top-[-12px] left-[28px] bg-[#12CF6F] text-white text-center p-[2px] w-[30px] h-[30px]">
                    {cartData.length}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
