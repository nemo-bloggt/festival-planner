import Card from "../ui/Card";
import { Link } from "react-router-dom";

export default function FestivalDetailHeader({
  festival,
  canManageFestival,
}) {
  return (
    <Card className="mt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {festival.name}
          </h1>

          <p className="mt-2 text-slate-400">
            {festival.location}
          </p>
        </div>

        {canManageFestival && (
          <Link
  to={`/festivals/${festival.slug}/settings`}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Festival verwalten
          </Link>
        )}
      </div>
    </Card>
  );
}