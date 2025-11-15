export default function DashboardHome() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      <p className="text-muted-foreground">
        Welcome to your Inflyte API Suite dashboard.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="p-6 bg-muted/40 rounded-xl border hover:bg-muted/60 transition">
          <h3 className="font-semibold text-lg">API Requests</h3>
          <p className="text-muted-foreground text-sm mt-2">
            Create and send requests using the API Console.
          </p>
        </div>

        <div className="p-6 bg-muted/40 rounded-xl border hover:bg-muted/60 transition">
          <h3 className="font-semibold text-lg">Analytics</h3>
          <p className="text-muted-foreground text-sm mt-2">
            Track request history, response time, errors & usage.
          </p>
        </div>

        <div className="p-6 bg-muted/40 rounded-xl border hover:bg-muted/60 transition">
          <h3 className="font-semibold text-lg">AI Tools</h3>
          <p className="text-muted-foreground text-sm mt-2">
            Use AI to generate API schemas, fix requests and more.
          </p>
        </div>

      </div>
    </div>
  );
}
