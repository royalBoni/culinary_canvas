import Link from "next/link";
import "./styles.css";
import { Button } from "@/components/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 radial">
      <div>
        <video autoPlay muted loop id="myVideo">
          <source src="bg-video.mp4" type="video/mp4" />{" "}
          {/* credit to pexel for this video */}
        </video>

        <div className="content flex flex-col gap-5 justify-center items-center h-full w-full">
          <h1 className="text-pink-500 text-6xl font-bold text-center">
            It is not just Food
            <br />
            <span className="text-gray-500 text-7xl ">It is an Experience</span>
          </h1>
          <Button>
            <Link href="/recipies">Explore</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
