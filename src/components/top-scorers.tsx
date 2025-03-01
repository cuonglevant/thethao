type TopScorer = {
  pos: number;
  name: string;
  team: string;
  teamLogo: string;
  goals: number;
  photo: string;
};

export function TopScorers({
  title = "DANH SÁCH CẦU THỦ GHI BÀN",
  scorers,
}: {
  title?: string;
  scorers: TopScorer[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-2 sm:p-4">
        <div className="space-y-2">
          {scorers.map((scorer) => (
            <div
              key={scorer.pos}
              className="flex items-center justify-between py-2 border-b text-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 w-6">{scorer.pos}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={scorer.photo}
                    alt={scorer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{scorer.name}</span>
                  <div className="flex items-center space-x-1">
                    <img
                      src={scorer.teamLogo}
                      alt={scorer.team}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">{scorer.team}</span>
                  </div>
                </div>
              </div>
              <div className="font-bold">{scorer.goals} bàn</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
