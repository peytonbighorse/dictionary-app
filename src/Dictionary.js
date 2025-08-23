import "./Dictionary.css";
import { useState } from "react";
import axios from "axios";
export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [phoenticPronunciation, setPhoenticPronunciation] = useState(null);
  const [partOfSpeech, setPartOfSpeech] = useState(null);
  const [example, setExample] = useState(null);
  function changeKeyword(event) {
    setKeyword(event.target.value);
  }

  function getDefinition(response) {
    console.log(response);
    function checkExample() {
      if (response.data.meanings[0].example) {
        return `"${response.data.meanings[0].example}"`;
      } else {
        return null;
      }
    }

    setSearchWord(response.data.word);
    setDefinition(response.data.meanings[0].definition);
    setPhoenticPronunciation(response.data.phonetic);
    setPartOfSpeech(response.data.meanings[0].partOfSpeech);
    setExample(checkExample());

    return null;
  }
  function search(event) {
    event.preventDefault();
    const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    console.log(keyword);
    console.log(apiKey);
    axios.get(apiUrl).then(getDefinition);
  }
  return (
    <div className="container">
      <form onSubmit={search}>
        <input type="search" autoFocus={true} onChange={changeKeyword} />
        <input type="submit" />
      </form>

      <h2 className="search-word">{searchWord}</h2>
      <p className="phoentic-pronunciation">{phoenticPronunciation}</p>
      <p className="part-of-speech">{partOfSpeech}</p>
      <p className="definition">{definition}</p>
      <p className="example">{example}</p>
    </div>
  );
}
