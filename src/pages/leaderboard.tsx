import LeaderboardComponent from "@/components/ui/leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col items-center p-2 sm:p-4 gap-y-4 sm:gap-y-6 justify-center min-h-screen text-xl sm:text-2xl md:text-3xl">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">LEADERBOARD</h1>

      <LeaderboardComponent />
    </div>
  );
};

export default LeaderboardPage;
