import men from "../assets/img/men-and-cat.jpg";

export function HeroSection() {
  return (
    <div className="flex w-full py-[40px] 2xl:py-[60px] px-[16px] 2xl:px-[120px] bg-neutral-100">
      <div className="w-full max-w-[375px] 2xl:max-w-[1440px] mx-auto flex flex-col 2xl:flex-row 2xl:items-center gap-[40px] 2xl:gap-[60px]">
        {/* box1 */}
        <div className="flex 2xl:flex-1 flex-col w-full gap-[16px] ">
          <h2 className=" text-headline-2 2xl:hidden text-center  2xl:text-end text-neutral-600 ">
            Smart Manufacturing Dashboard
          </h2>

          <h1 className="hidden 2xl:flex  text-headline-1 text-center  2xl:text-end text-neutral-600 ">
            Smart Manufacturing Dashboard
          </h1>

          <span className="text-body-1 text-center 2xl:text-end text-neutral-400 ">
            Real-time production insights to improve efficiency, reduce
            downtime, and support data-driven decisions across your factory.
          </span>
        </div>

        {/* image*/}
        <div className="w-[343px] 2xl:w-[386px] 2xl:h-[529px] h-[470px] rounded-[16px] overflow-hidden relative">
          <img src={men} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-[#BEBBB140]"></div>
        </div>

        {/* box2 */}
        <div className="flex 2xl:flex-1 flex-col justify-start 2xl:gap-[12px]">
          <div className="flex flex-col 2xl:gap-[4px]">
            <span className="text-body-3 text-neutral-400">-Author</span>
            <h3 className="text-headline-3 text-neutral-500">Thompson P.</h3>
          </div>
          <span className="text-body-1 text-neutral-400">
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

import google from "../assets/icons/icon-google_black.svg";
import { Github, Linkedin } from 'lucide-react';
export function Footer() {
  return (
    <div className="flex flex-col 2xl:flex-row bg-neutral-200 py-[40px] 2xl:py-[60px] px-[16px] 2xl:px-[120px] gap-[24px] justify-center 2xl:justify-between items-center">
      <div className="flex flex-row gap-[24px]">
        <p className="text-body-1">Get in touch</p>
        <Linkedin/>
        <Github />
        <img src={google} />
      </div>
      <button className="text-body-1 text-neutral-600 hover:text-neutral-400 hover:cursor-pointer underline">
        Home page
      </button>
    </div>
  );
}