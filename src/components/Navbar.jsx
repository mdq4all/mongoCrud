import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-700 p-6 flex justify-between">
      <Link href="/">
        <h1 className="text-white font-bold text-2xl">Mongo next</h1>
      </Link>
      <Link href="/tasks/new">
        <h3>Add task</h3>
      </Link>
    </nav>
  );
}
