type Props = {
  title: string;
  value: number;
  icon: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      <div className="text-4xl">{icon}</div>

      <h3 className="mt-4 text-gray-500">
        {title}
      </h3>

      <div className="text-3xl font-bold">
        {value}
      </div>

    </div>
  );
}
