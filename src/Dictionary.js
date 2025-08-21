import "./Dictionary.css";
import { useState } from "react";
export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  function changeKeyword(event) {
    setKeyword(event.target.value);
  }
  function search(event) {
    event.preventDefault();
    alert(`Looking for ${keyword}`);
  }
  return (
    <div className="container">
      <form onSubmit={search}>
        <input type="search" autoFocus={true} onChange={changeKeyword} />
        <input type="submit" />
      </form>
    </div>
  );
}
