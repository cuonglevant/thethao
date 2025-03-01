type Team = {
  pos: number;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
};

export function LeagueStandings({
  title = "BẢNG XẾP HẠNG V LEAGUE 1",
  teams,
}: {
  title?: string;
  teams: Team[];
}) {
  const Stats = ({ data }: { data: Team }) => (
    <div className="flex items-center justify-between py-2 border-b text-sm sm:text-base">
      <div className="flex items-center space-x-2">
        <span
          className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded text-sm ${
            data.pos <= 3 ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          {data.pos}
        </span>
        <img
          src={data.logo}
          alt={data.team}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
        <span className="font-medium truncate max-w-[100px] sm:max-w-[150px]">
          {data.team}
        </span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {[data.played, data.won, data.drawn, data.lost, data.gd].map(
          (stat, i) => (
            <span key={i} className="hidden sm:inline">
              {stat}
            </span>
          )
        )}
        <span className="font-bold">{data.points}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] flex flex-col">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-2 sm:p-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {teams.map((team) => (
            <Stats key={team.pos} data={team} />
          ))}
        </div>
        <div className="mt-4 text-xs sm:text-sm text-gray-600">
          Nếu các đội bằng điểm nhau vào cuối mùa giải, việc xếp hạng sẽ dựa vào
          thành tích đối đầu.
        </div>
      </div>
    </div>
  );
}
