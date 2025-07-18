import { getLeaderboard } from "@/services/api/session";
import { useQuery } from "@tanstack/react-query";

const LeaderboardComponent = () => {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        leaderboard?.leaderboard.map((player, index) => (
          <div
            key={player.username}
            className="flex items-center space-x-4 p-3 bg-gradient-to-r from-black to-gray-900 border-2 border-gray-700 hover:border-cyan-400 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`font-black text-xl sm:text-2xl ${
                  index === 0
                    ? "text-yellow-400"
                    : index === 1
                    ? "text-gray-300"
                    : index === 2
                    ? "text-orange-400"
                    : "text-gray-500"
                }`}
              >
                #{index + 1}
              </div>
              {index < 3 && (
                <div className="text-xl truncate sm:text-2xl">
                  {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono font-bold tracking-wider">
                  {player.username}
                </span>
              </div>
              <div className="text-cyan-400 font-mono text-sm">
                {player.wins} WINS
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LeaderboardComponent;
