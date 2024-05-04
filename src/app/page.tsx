import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div>
        <p>A culinary canvas about to change the whole landscape of recipes</p>
        <p className="text-red-700">Components under construction</p>
        <Link href="/recipies" className="text-blue-400">
          Check out our recipies
        </Link>
      </div>
    </main>
  );
}
