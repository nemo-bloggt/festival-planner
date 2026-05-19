import Card from "../ui/Card";

export default function FestivalDetailHeader({ festival }) {
  return (
    <Card className="mt-6">
      <h1 className="text-3xl font-bold">{festival.name}</h1>

      <p className="mt-2 text-slate-400">
        {festival.location}
      </p>
    </Card>
  );
}