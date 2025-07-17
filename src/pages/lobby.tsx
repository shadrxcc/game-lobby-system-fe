import Button from "@/components/shared/button";
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
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen px-2 sm:px-0 text-xl sm:text-3xl">
      <h1 className="font-bold text-lg sm:text-2xl text-center">Current Game Session</h1>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-md bg-white/10 rounded-xl p-4 sm:p-8 shadow-glass">
        <h2 className="text-base sm:text-lg font-bold text-center">
          Session Status:{" "}
          {session?.isActive ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-700">Inactive</span>
          )}
        </h2>

        {session?.isActive && (
          <>
            <p className="text-base sm:text-lg text-center">Time Left: {session.timeLeft} seconds</p>

            <Button
              loading={isPending}
              className="w-full sm:w-auto text-base sm:text-lg"
              onClick={() => joinSessionMutation()}
              disabled={isPending}
            >
              Join Session
            </Button>

            <p className="text-base sm:text-lg text-center">
              {session.playersCount} player(s) in the session...
            </p>
          </>
        )}

        {!session?.isActive && (
          <p className="text-base sm:text-lg text-gray-600 text-center">
            Waiting for next session to start...
          </p>
        )}
      </div>
    </div>
  );
};

export default LobbyPage;
