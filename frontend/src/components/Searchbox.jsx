import React, { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helper/RouteName";

const Searchbox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const getInput = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        placeholder="Search"
        className={"h-9 rounded-full bg-gray-100 text-black"}
      />
    </form>
  );
};

export default Searchbox;
