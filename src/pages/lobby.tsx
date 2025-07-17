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
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen text-3xl">
      <h1>Current Game Session</h1>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold">
          Session Status:{" "}
          {session?.isActive ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-700">Inactive</span>
          )}
        </h2>

        {session?.isActive && (
          <>
            <p className="text-lg">Time Left: {session.timeLeft} seconds</p>

            <Button
              loading={isPending}
              className="w-full"
              onClick={() => joinSessionMutation()}
              disabled={isPending}
            >
              Join Session
            </Button>

            <p className="text-lg">
              {session.playersCount} player(s) in the session...
            </p>
          </>
        )}

        {!session?.isActive && (
          <p className="text-lg text-gray-600">
            Waiting for next session to start...
          </p>
        )}
      </div>
    </div>
  );
};

export default LobbyPage;
