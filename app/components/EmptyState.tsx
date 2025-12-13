import { FaUsers } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="flex-1 hidden md:flex flex-col items-center justify-center text-gray-400">
      <FaUsers size={48} className="mb-4 opacity-40" />
      <p className="text-lg font-medium">Select a user</p>
      <p className="text-sm">View profile details</p>
    </div>
  );
}
