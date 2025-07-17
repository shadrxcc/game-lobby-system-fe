// import Button from "@/components/shared/button";
// import { getResults, pickNumber, sessionStatus } from "@/services/api/session";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const GamePage: React.FC = () => {
//   const [pick, setPick] = useState<number | null>(null);
//   const [showResults, setShowResults] = useState(false);

//   const navigate = useNavigate();

//   const { mutate: pickNumberMutation, isPending } = useMutation({
//     mutationFn: pickNumber,
//     onSuccess: (data) => {
//       toast.success(data.message);
//     },
//     onError: (error: { error: string }) => {
//       toast.error(error.error || "Something went wrong");
//     },
//   });

//   const { data } = useQuery({
//     queryKey: ["sessionStatus"],
//     queryFn: sessionStatus,
//     // refetchInterval: 1000,
//   });

//   const { data: results, refetch: refetchResults } = useQuery({
//     queryKey: ["results"],
//     queryFn: getResults,
//     enabled: false,
//   });

//   useEffect(() => {
//     if (
//       (data && !data.hasJoined && data.isActive) ||
//       (data && !data.isActive)
//     ) {
//       navigate("/lobby");
//       toast.info("You need to join the session first!");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (data && !data.isActive) {
//       refetchResults();
//       setShowResults(true);
//     } else {
//       setShowResults(false);
//     }
//   }, [data, refetchResults]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-3xl">
//       <div className="flex flex-col items-center gap-4">
//         {showResults ? (
//           <div className="flex flex-col items-center gap-4">
//             <h2 className="text-lg font-bold text-center">Results</h2>
//           </div>
//         ) : (
//           <>
//             <p>Total Players: {data?.players}</p>
//             <p>Time Left: {data?.timeLeft} seconds</p>
//           </>
//         )}
//       </div>

//       {showResults && (
//         <div className="flex flex-col items-center gap-4">
//           <h2 className="text-lg font-bold text-center">Winners</h2>
//           <div className="flex flex-col items-center gap-4">
//             {results?.winners.map((winner) => (
//               <p key={winner.username}>{winner.username}</p>
//             ))}
//           </div>
//         </div>
//       )}

//       {!showResults && (
//         <div className="flex flex-col items-center gap-4">
//           <h2 className="text-lg font-bold text-center">Pick a Number</h2>
//           <div className="flex flex-row max-w-md flex-wrap justify-center gap-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
//               <Button
//                 className={`!w-fit ${
//                   pick === number ? "!bg-primary !text-white" : ""
//                 }`}
//                 key={number}
//                 onClick={() => {
//                   setPick(number);
//                   pickNumberMutation(number);
//                 }}
//                 disabled={isPending || pick !== null}
//               >
//                 {number}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GamePage;

import Button from "@/components/shared/button";
import { getResults, pickNumber, sessionStatus, joinSession, leaveSession } from "@/services/api/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GamePage: React.FC = () => {
  const [pick, setPick] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const { mutate: pickNumberMutation, isPending } = useMutation({
    mutationFn: pickNumber,
    onSuccess: (data) => {
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
    } else if (data && !data.isActive) {
      navigate("/lobby");
      toast.info("Session has ended");
    }
  }, [data, joinSessionMutation]);

  useEffect(() => {
    if (data && !data.isActive) {
      refetchResults();
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [data, refetchResults]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-3xl">
      <div className="flex flex-col items-center gap-4">
        {showResults ? (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-bold text-center">Results</h2>
            {data?.nextSessionStart !== null && (
              <p className="text-sm text-gray-600">
                Next session starts in: {data?.nextSessionStart} seconds
              </p>
            )}
          </div>
        ) : (
          <>
            <p>Time Left: {data?.timeLeft} seconds</p>
            <p>Total Players: {data?.players}</p>
         
            {data?.hasPicked && (
              <p className="text-sm text-green-600">Waiting for results...</p>
            )}
          </>
        )}
      </div>

      {showResults && results && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-bold text-center">Winners</h2>
          <div className="flex flex-col items-center gap-4">
            {results.winners.length > 0 ? (
              results.winners.map((winner) => (
                <p key={winner.username} className="text-green-600 font-bold">
                  🎉 {winner.username}
                </p>
              ))
            ) : (
              <p className="text-gray-600">No winners this round</p>
            )}
          </div>
          <p className="text-sm">Winning number: {results.winningNumber}</p>
        </div>
      )}

      {!showResults && data?.hasJoined && !data?.hasPicked && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-bold text-center">Pick a Number</h2>
          <div className="flex flex-row max-w-md flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <Button
                className={`!w-fit ${
                  pick === number ? "!bg-primary !text-white" : ""
                }`}
                key={number}
                onClick={() => {
                  setPick(number);
                  pickNumberMutation(number);
                }}
                disabled={isPending || pick !== null}
              >
                {number}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Button className="mt-4" onClick={() => leaveSessionMutation()}>Leave Session</Button>
    </div>
  );
};

export default GamePage;