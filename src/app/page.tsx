import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen p-12 pb-20 sm:p-20">
      <div className="flex flex-col items-center">
        <h1 className="font-silkscreen text-5xl sm:text-7xl text-center">speed io</h1>
        <p className="p-4 text-center">Welcome to speedio game. Press start to guess the daily speed!</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <Link href={"/game"} className="font-silkscreen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-2 px-4 text-center">
          start
        </Link>
      </div>
    </div>
  );
}
