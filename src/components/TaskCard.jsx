import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task.id}`}>
        <div className="bg-gray-800 p-10 rounded-xl text-white hover:cursor-pointer hover:bg-gray-600">
        <h2 className="text-xl font-bold pb-2">{task.title}</h2>
        <p className="opacity-50">{task.description}</p>
        <span>Creted at: {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
    </Link>
  );
}
