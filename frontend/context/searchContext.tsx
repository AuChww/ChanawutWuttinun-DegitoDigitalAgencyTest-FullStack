"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SearchState {
  keyword: string;
  location: string;
  checkIn: string;
  checkOut: string;
  capacity: string;
}

interface SearchContextType extends SearchState {
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<SearchState>({
    keyword: "",
    location: "",
    checkIn: "",
    checkOut: "",
    capacity: "2 adult, 0 children - 1 room",
  });

  return (
    <SearchContext.Provider value={{ ...search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
