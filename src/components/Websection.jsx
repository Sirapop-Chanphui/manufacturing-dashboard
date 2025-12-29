import logohh from "../assets/icons/logo-hh.svg";
import hamburger from "../assets/icons/icon-hamburger.svg";
import Button from "../components/common/Button";


export function NavBar() {
  return (
    <nav className="flex flex-row w-full  justify-between items-center bg-brown-100 py-[12px] md:py-[16px] px-[24px] md:px-[120px] border-b border-brown-300">
      <div className="w-full max-w-[375px] md:max-w-[1440px] mx-auto flex flex-row justify-between items-center">
        <img
          src={logohh}
          alt="Logo hh"
          className="w-[24px] md:w-[44px] h-[24px] md:h-[44px]"
        />
        <img
          src={hamburger}
          alt="Logo hh"
          className="w-[18px] h-[12px] md:hidden"
        />
        <div className="hidden md:flex flex-row gap-[8px]">
          <Button buttonText="Log in" buttonStyle="secondary" />
          <Button buttonText="Sign up" buttonStyle="primary" />
        </div>
      </div>
    </nav>
  );
}

import men from "../assets/img/men-and-cat.jpg";

export function HeroSection() {
  return (
    <div className="flex w-full py-[40px] md:py-[60px] px-[16px] md:px-[120px] bg-brown-100">
      <div className="w-full max-w-[375px] md:max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center gap-[40px] md:gap-[60px]">
        {/* box1 */}
        <div className="flex md:flex-1 flex-col w-full gap-[16px] ">
          <h2 className=" text-headline-2 md:hidden text-center  md:text-end text-brown-600 ">
            Smart Manufacturing Dashboard
          </h2>

          <h1 className="hidden md:flex  text-headline-1 text-center  md:text-end text-brown-600 ">
            Smart Manufacturing Dashboard
          </h1>

          <span className="text-body-1 text-center md:text-end text-brown-400 ">
            Real-time production insights to improve efficiency, reduce
            downtime, and support data-driven decisions across your factory.
          </span>
        </div>

        {/* image*/}
        <div className="w-[343px] md:w-[386px] md:h-[529px] h-[470px] rounded-[16px] overflow-hidden relative">
          <img src={men} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-[#BEBBB140]"></div>
        </div>

        {/* box2 */}
        <div className="flex md:flex-1 flex-col justify-start md:gap-[12px]">
          <div className="flex flex-col md:gap-[4px]">
            <span className="text-body-3 text-brown-400">-Author</span>
            <h3 className="text-headline-3 text-brown-500">Thompson P.</h3>
          </div>
          <span className="text-body-1 text-brown-400">
            This dashboard provides a comprehensive overview of manufacturing
            operations, including machine status, production output, and
            efficiency metrics. <br />
            <br />
            Managers and engineers can track performance in real time, identify
            bottlenecks, and make informed decisions to continuously improve
            operational excellence.
          </span>
        </div>
      </div>
    </div>
  );
}

