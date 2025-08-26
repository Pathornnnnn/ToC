export default function Favorites() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favorite Games</h2>
      <p className="text-gray-400">ยังไม่มีเกมที่คุณชื่นชอบ</p>
      <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">
        Export CSV
      </button>
    </div>
  );
}
