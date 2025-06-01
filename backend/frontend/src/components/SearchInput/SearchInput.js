import { useState } from "react";

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query) {
            onSearch(query);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={handleChange} 
                placeholder="Введите название места" 
            />
            <button onClick={handleSearch}>Поиск</button>
        </div>
    );
};

export default SearchInput;