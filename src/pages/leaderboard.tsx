import LeaderboardComponent from "@/components/ui/leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col items-center p-4 gap-y-6 justify-center min-h-screen text-3xl">
      <h1 className="text-2xl font-bold">LEADERBOARD</h1>

      <LeaderboardComponent />
    </div>
  );
};

export default LeaderboardPage;
