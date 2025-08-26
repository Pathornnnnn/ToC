import React from "react";
import "./gameTable.css";

function GameTable({ games }) {
  return (
    <div className="p-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Tags</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                key={game.ID}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-2">{game.ID}</td>
                <td className="px-4 py-2">{game.Title}</td>
                <td className="px-4 py-2">
                  {game.Tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-600 text-white px-2 py-1 mr-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <img
                    src={game.Image}
                    alt={game.Title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{game.Date}</td>
                <td className="px-4 py-2">{game.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {games.map((game) => (
          <div
            key={game.ID}
            className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={game.Image}
              alt={game.Title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{game.Title}</h3>
            <p className="text-gray-300 text-sm mb-1">{game.Date}</p>
            <div className="mb-2">
              {game.Tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-600 text-white px-2 py-1 mr-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-200 text-sm">{game.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameTable;
