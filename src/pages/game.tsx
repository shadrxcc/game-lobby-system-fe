import Button from "@/components/shared/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth.context";
import {
  getResults,
  pickNumber,
  sessionStatus,
  joinSession,
  leaveSession,
} from "@/services/api/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GamePage: React.FC = () => {
  const { user } = useAuth();

  const [pick, setPick] = useState<number | null>(null);
  const [lastSessionKey, setLastSessionKey] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate: pickNumberMutation, isPending } = useMutation({
    mutationFn: pickNumber,
    onSuccess: (data, variables) => {
      setPick(variables);
      toast.success(data.message);
    },
    onError: (error: { error: string }) => {
      toast.error(error.error || "Something went wrong");
    },
  });

  const { mutate: leaveSessionMutation } = useMutation({
    mutationFn: leaveSession,
    onSuccess: () => {
      toast.success("Left session successfully");
      navigate("/lobby");
    },
  });

  const { mutate: joinSessionMutation } = useMutation({
    mutationFn: joinSession,
    onSuccess: () => {
      toast.success("Auto-joined new session!");
      setPick(null);
    },
    onError: (error: { error: string }) => {
      toast.error(error.error || "Failed to auto-join");
    },
  });

  const { data } = useQuery({
    queryKey: ["sessionStatus"],
    queryFn: sessionStatus,
    refetchInterval: 1000,
  });

  const { data: results, refetch: refetchResults } = useQuery({
    queryKey: ["results"],
    queryFn: getResults,
    enabled: false,
  });

  useEffect(() => {
    if (data && !data.hasJoined && data.isActive) {
      joinSessionMutation();
    }
  }, [data, joinSessionMutation]);

  useEffect(() => {
    if (data) {
      const sessionKey = `${data.isActive}-${data.timeLeft}`;
      if (sessionKey !== lastSessionKey) {
        setPick(null);
        setLastSessionKey(sessionKey);
      }
      if (!data.isActive) {
        refetchResults();
      }
    }
  }, [data, refetchResults, lastSessionKey]);

  useEffect(() => {
    if (data && data.hasPicked && pick == null && typeof data.pick === "number") {
      setPick(data.pick);
    }
    if (data && data.isActive && !data.hasPicked && pick !== null) {
      setPick(null);
    }
  }, [data, pick]);

  const oneOfWinners =
    results &&
    results?.winners?.find((winner) => winner.username === user?.username);

  const isSessionActive = data?.isActive;
  const hasPicked = data?.hasPicked;
  const showResults = !isSessionActive && results;
  const showPick = isSessionActive && !hasPicked;
  const showWaiting = isSessionActive && hasPicked && pick != null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 md:px-8 text-lg sm:text-xl md:text-2xl lg:text-3xl">
      {showPick && (
        <div className="space-y-6">
          <div className="bg-black border-4 border-red-500 p-4 sm:p-6 md:p-8 text-center shadow-[0_0_40px_rgba(239,68,68,0.6)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-2 sm:px-4 text-red-500 font-mono text-xs sm:text-sm tracking-wider">
              COUNTDOWN TIMER
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="relative inline-block">
                <div className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-pulse">
                  {data?.timeLeft?.toString().padStart(2, "0")}
                </div>
                <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-black text-red-400 tracking-widest animate-bounce">
                PICK YOUR NUMBER NOW!
              </div>
              <Progress value={data?.timeLeft} />
            </div>
          </div>

          <div className="bg-black border-4 border-cyan-400 p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(34,211,238,0.6)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-2 sm:px-4 text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">
              SELECT YOUR LUCKY NUMBER
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-2 sm:mt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Button
                  key={num}
                  disabled={isPending || pick !== null}
                  onClick={() => pickNumberMutation(num)}
                  variant={pick === num ? "primary" : "neon"}
                  className={`h-14 sm:h-16 md:h-20 lg:h-24 text-2xl sm:text-3xl md:text-4xl font-black border-4 transition-all duration-200`}
                >
                  {num}
                </Button>
              ))}
            </div>
            {pick && (
              <div className="mt-4 sm:mt-8 text-center">
                <div className="inline-block bg-gradient-to-r from-green-500 to-cyan-400 text-black font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-8 py-2 sm:py-4 border-4 border-white shadow-[0_0_30px_rgba(34,197,94,0.8)] tracking-wider">
                  SELECTED: {pick}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showWaiting && (
        <div className="space-y-6">
          <div className="bg-black border-4 border-yellow-400 p-6 sm:p-8 md:p-12 text-center shadow-[0_0_40px_rgba(250,204,21,0.6)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-2 sm:px-4 text-yellow-400 font-mono text-xs sm:text-sm tracking-wider">
              DRAWING WINNING NUMBER
            </div>
            <div className="space-y-4 sm:space-y-8">
              <div className="text-5xl sm:text-7xl md:text-8xl animate-spin">🎲</div>
              <div className="space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 tracking-wider animate-pulse">
                  CALCULATING RESULTS...
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-mono">
                  YOUR NUMBER: {" "}
                  <span className="text-pink-500 font-black">{pick}</span>
                </p>
              </div>
              <div className="flex justify-center space-x-2 sm:space-x-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="space-y-6">
          <div
            className={`border-8 p-6 sm:p-8 md:p-12 text-center relative ${
              oneOfWinners
                ? "bg-gradient-to-r from-green-900 to-cyan-900 border-green-400 shadow-[0_0_60px_rgba(34,197,94,0.8)]"
                : "bg-gradient-to-r from-red-900 to-purple-900 border-red-400 shadow-[0_0_60px_rgba(239,68,68,0.8)]"
            }`}
          >
            <div
              className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black px-2 sm:px-4 font-mono text-xs sm:text-sm tracking-wider ${
                oneOfWinners ? "text-green-400" : "text-red-400"
              }`}
            >
              GAME RESULT
            </div>

            <div className="space-y-4 sm:space-y-8">
              {oneOfWinners ? (
                <>
                  <div className="text-5xl sm:text-7xl md:text-8xl animate-bounce">🏆</div>
                  <div className="space-y-2 sm:space-y-4">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 tracking-wider animate-pulse">
                      JACKPOT!
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl text-yellow-400 font-black tracking-wider">
                      WINNER: {user?.username?.toUpperCase()}!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl sm:text-7xl md:text-8xl">💥</div>
                  <div className="space-y-2 sm:space-y-4">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 tracking-wider animate-pulse">
                      GAME OVER
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl text-yellow-400 font-black tracking-wider">
                      TRY AGAIN, {user?.username?.toUpperCase()}!
                    </p>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 max-w-xs sm:max-w-2xl mx-auto">
                <div className="space-y-2 sm:space-y-4">
                  <p className="text-base sm:text-lg text-gray-300 font-mono tracking-wider">
                    YOUR NUMBER
                  </p>
                  <div className="text-5xl sm:text-7xl md:text-8xl font-black text-pink-400 animate-pulse">
                    {pick}
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <p className="text-base sm:text-lg text-gray-300 font-mono tracking-wider">
                    WINNING NUMBER
                  </p>
                  <div className="text-5xl sm:text-7xl md:text-8xl font-black text-yellow-400 animate-pulse">
                    {results?.winningNumber}
                  </div>
                </div>

                {results?.winners && results?.winners?.length > 0 ? (
                  <div className="space-y-2 sm:space-y-4 col-span-full">
                    <p className="text-base sm:text-lg text-gray-300 font-mono tracking-wider">
                      WINNERS
                    </p>
                    <div className="text-2xl sm:text-4xl md:text-6xl font-black font-mono text-yellow-400">
                      {results?.winners.map((winner) => (
                        <p key={winner.username}>{winner.username} 🚀</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-base sm:text-lg text-center font-black text-yellow-400 col-span-full">
                    NO WINNERS FOR THIS ROUND
                  </div>
                )}
              </div>

              <p className="text-cyan-400 font-mono text-xs sm:text-lg animate-pulse">
                {">>> READY FOR ANOTHER ROUND? <<<"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4 sm:mt-6">
        <Button
          onClick={() => leaveSessionMutation()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-black font-black text-xl sm:text-2xl md:text-3xl px-6 sm:px-12 py-3 sm:py-6 border-4 border-white shadow-[0_0_40px_rgba(168,85,247,0.8)] hover:shadow-[0_0_60px_rgba(236,72,153,1)] transform hover:scale-105 transition-all duration-200 tracking-widest"
        >
          ⚡ LEAVE SESSION ⚡
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
