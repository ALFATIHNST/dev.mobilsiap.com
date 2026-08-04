export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">

      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <input
          className="border rounded-lg px-4 py-2"
          placeholder="Cari..."
        />

        <button>🔔</button>

        <div className="text-right">
          <div className="font-semibold">Admin</div>
          <div className="text-xs text-gray-500">
            SUPER ADMIN
          </div>
        </div>

      </div>

    </header>
  );
}
