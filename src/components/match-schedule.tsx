type Match = { time: string; home: Team; away: Team };
type Team = { name: string; logo: string };

export function MatchSchedule({
  title = "LỊCH THI ĐẤU V LEAGUE 1",
  matchDays,
}: {
  title?: string;
  matchDays: { date: string; matches: Match[] }[];
}) {
  const Team = ({
    data: { name, logo },
    isHome,
  }: {
    data: Team;
    isHome?: boolean;
  }) => (
    <div
      className={`flex items-center ${
        isHome ? "justify-end" : "justify-start"
      } flex-1`}
    >
      {isHome && <span className="font-medium mr-2">{name}</span>}
      <img src={logo} alt={name} className="w-6 h-6 object-contain" />
      {!isHome && <span className="font-medium ml-2">{name}</span>}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="divide-y">
        {matchDays.map(({ date, matches }, i) => (
          <div key={date} className="p-4">
            {!i && (
              <div className="text-sm text-blue-600 font-medium mb-2">
                Chính
              </div>
            )}
            <div className="text-right text-sm text-gray-600 mb-4">{date}</div>
            {matches.map(({ time, home, away }, j) => (
              <div
                key={`${time}-${j}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50"
              >
                <span className="text-blue-800 font-medium w-16">{time}</span>
                <Team data={home} isHome />
                <div className="mx-4 font-bold">? - ?</div>
                <Team data={away} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
