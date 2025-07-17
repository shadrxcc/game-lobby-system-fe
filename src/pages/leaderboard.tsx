import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/services/api/session";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LeaderboardSkeleton = () => {
  return (
    <Table className="max-w-md mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Wins</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="w-full h-8 bg-white/20 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="w-full h-8 bg-white/20 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const LeaderboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  return (
    <div className="flex flex-col items-center gap-y-6 justify-center min-h-screen text-3xl">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      {isLoading ? (
        <LeaderboardSkeleton />
      ) : (
        <Table className="max-w-md mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.leaderboard.map((player) => (
              <TableRow key={player.username}>
                <TableCell className="font-medium">{player.username}</TableCell>
                <TableCell>{player.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LeaderboardPage;