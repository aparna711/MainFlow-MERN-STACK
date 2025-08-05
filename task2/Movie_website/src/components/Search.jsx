
function Search({ searchTerm, setSearchTerm }) {
  return (
   <div className="search-container flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-xl mx-auto mt-6">
  <img
    src="/search_icon.svg"
    alt="Search"
    className="w-5 h-5 mr-3 opacity-60"
  />
  <input
    type="text"
    placeholder="Search for movies..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
  />
</div>
  );
}
export default Search;