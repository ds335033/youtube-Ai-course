export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome to the Founder's Alpha
          </h3>
          <p className="text-sm text-muted-foreground">
            This is the command center for the new YouTube PhD AI Academy.
          </p>
        </div>
      </div>
    </div>
  );
}
