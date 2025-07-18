import Button from "@/components/shared/button";
import LeaderboardComponent from "@/components/ui/leaderboard";
import { getSession, joinSession } from "@/services/api/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    refetchInterval: 1000,
  });

  const { mutate: joinSessionMutation, isPending } = useMutation({
    mutationFn: joinSession,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/lobby/game");
    },
    onError: (error: { error: string }) => {
      toast.error(error.error);
    },
  });

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 relative">
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-black border-4 border-yellow-400 p-4 sm:p-6 shadow-[0_0_30px_rgba(250,204,21,0.4)] relative">
              <div className="absolute -top-3 left-2 sm:left-4 bg-black px-1 sm:px-2 text-yellow-400 font-mono text-xs sm:text-sm tracking-wider">
                GAME SESSION STATUS
              </div>

              {session?.isActive ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center space-y-2 sm:space-y-4">
                    <div className="relative inline-block">
                      <div className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-pulse">
                        {session?.timeLeft.toString().padStart(2, "0")}
                      </div>
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-red-500 to-yellow-400 rounded-lg blur-xl opacity-30 animate-pulse"></div>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-red-400 tracking-widest animate-bounce">
                      SECONDS REMAINING
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div className="bg-black border-2 border-cyan-400 p-2 sm:p-4 text-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      <div className="text-2xl sm:text-4xl font-black text-cyan-400">
                        {session?.playersCount}
                      </div>
                      <div className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">
                        PLAYERS JOINED
                      </div>
                    </div>
                    <div className="bg-black border-2 border-pink-500 p-2 sm:p-4 text-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                      <div className="text-2xl sm:text-4xl font-black text-pink-500">
                        1-10
                      </div>
                      <div className="text-pink-500 font-mono text-xs sm:text-sm tracking-wider">
                        NUMBER RANGE
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={isPending}
                    isLoading={isPending || !session?.isActive}
                    onClick={() => joinSessionMutation()}
                    className="w-full text-base sm:text-lg md:text-xl py-2 sm:py-3"
                  >
                    ⚡ JOIN SESSION ⚡
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl animate-spin">⚙️</div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-3xl font-black text-red-400 tracking-wider">
                      SESSION ENDED
                    </h3>
                    <p className="text-yellow-400 font-mono text-base sm:text-lg animate-pulse">
                      {">>> PREPARING NEXT ROUND <<<"}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-1 sm:space-x-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-black border-4 border-pink-500 p-4 sm:p-6 shadow-[0_0_30px_rgba(236,72,153,0.4)] relative">
              <div className="absolute -top-3 left-2 sm:left-4 bg-black px-1 sm:px-2 text-pink-500 font-mono text-xs sm:text-sm tracking-wider">
                GAME RULES
              </div>
              <div className="space-y-2 sm:space-y-4">
                {[
                  "JOIN ACTIVE SESSION BEFORE TIMEOUT",
                  "PICK YOUR LUCKY NUMBER (1-10)",
                  "WAIT FOR RESULTS",
                  "CLIMB UP THE LEADERBOARD",
                ].map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-4">
                    <div className="bg-white text-black font-black w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm">
                      {index + 1}
                    </div>
                    <p className="text-white font-mono text-base sm:text-lg tracking-wide">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-black border-4 border-cyan-400 p-4 sm:p-6 shadow-[0_0_30px_rgba(34,211,238,0.4)] relative">
              <div className="absolute -top-3 left-2 sm:left-4 bg-black px-1 sm:px-2 text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">
                LEADERBOARD
              </div>

              <LeaderboardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
