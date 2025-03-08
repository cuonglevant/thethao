"use client";

import { useParams } from "next/navigation";

export default function TeamTabPage() {
  const params = useParams();
  const tab = params.tab as string;
  const slug = params.slug as string;

  // Extract team ID and name from the slug
  const teamId = Number(slug.split("-")[0]);
  const teamName = slug.replace(/^\d+-/, "").replace(/-/g, " ");

  // This default page handles any tab that doesn't have a specific implementation
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        {tab.replace(/-/g, " ").toUpperCase()}: {teamName}
      </h2>
      <p>Nội dung cho tab này đang được cập nhật...</p>
      <p className="text-sm text-gray-500 mt-2">ID đội bóng: {teamId}</p>
    </div>
  );
}
