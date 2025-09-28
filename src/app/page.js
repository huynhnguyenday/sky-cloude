import Image from "next/image";
import Units from "@/components/Units";
import Search from "@/components/Search";
import Main from "@/components/Main";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

export default function Home() {
  return (
    <div className="font-dmsans min-h-screen px-8 pb-20 sm:px-20 py-10 bg-[#01012b] text-white">
      {/* Grid tổng */}
      <div className="grid grid-rows-[auto_auto_1fr] gap-8">
        {/* Row 1: Header */}
        <header className="flex items-center justify-between">
          <Image src="/logo.svg" alt="Logo" width={200} height={80} />
          <Units />
        </header>
        <h1 className="text-6xl font-bold text-white text-center py-14 font-bricolage">
          How&apos;s the sky looking today?
        </h1>
        {/* Row 2: Search */}
        <div className="flex justify-center pb-8">
          <Search />
        </div>

        {/* Row 3: Main layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left (col-span-2) */}
          <div className="col-span-2 grid grid-rows-[2fr_1fr] gap-6">
            {/* Top */}
            <div className="bg-[#1e1e3f] p-4 rounded-2xl">
              <Main />
            </div>
            {/* Bottom */}
            <div className="bg-[#1e1e3f] p-4 rounded-2xl">
              <DailyForecast />
            </div>
          </div>

          {/* Right */}
          <div className="bg-[#1e1e3f] p-4 rounded-2xl">
            <HourlyForecast />
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {" "}
        <div className="attribution text-center text-sm text-gray-600">
          {" "}
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {" "}
            Frontend Mentor{" "}
          </a>{" "}
          . Coded by{" "}
          <a
            href="https://github.com/huynhnguyenday"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {" "}
            Nguyen Huu Huynh{" "}
          </a>{" "}
          .{" "}
        </div>{" "}
      </footer>
    </div>
  );
}
