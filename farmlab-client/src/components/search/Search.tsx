import { Search } from "@mui/icons-material";
import "./Search.css";

interface SearchProps {
  handleSearch: (searchTerm: string) => void;
}

const SearchComponent = ({ handleSearch }: SearchProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <section className="search ">
        <input type="text" placeholder="Search" onChange={handleInputChange} />
        <button type="submit">
          <Search />
        </button>
      </section>
    </div>
  );
};

export default SearchComponent;
