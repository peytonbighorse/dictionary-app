import "./Dictionary.css";
import { useState } from "react";
import axios from "axios";
export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [phoenticPronunciation, setPhoenticPronunciation] = useState(null);

  function changeKeyword(event) {
    setKeyword(event.target.value);
  }

  function getDefinition(response) {
    console.log(response);
    function checkExample(i) {
      if (response.data.meanings[i].example) {
        return `"${response.data.meanings[i].example}"`;
      } else {
        return null;
      }
    }

    function returnMeanings() {
      let meaningsArray = [...response.data.meanings];

      return (
        <div>
          {meaningsArray.map(function (i, index) {
            return (
              <div className="definition-entry" key={index}>
                <div className="part-of-speech">
                  {response.data.meanings[index].partOfSpeech}
                </div>
                <div className="meaning">
                  {response.data.meanings[index].definition}
                </div>
                <div className="example">{checkExample(index)}</div>
              </div>
            );
          })}
        </div>
      );
    }

    setSearchWord(response.data.word);
    setDefinitions(returnMeanings());
    setPhoenticPronunciation(response.data.phonetic);

    return null;
  }
  function search(event) {
    event.preventDefault();
    const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(getDefinition);
  }
  function showQuestion() {
    if (!searchWord) {
      return <div className="question">What word do you want to look up?</div>;
    } else {
      return null;
    }
  }

  return (
    <div className="Dictionary">
      {showQuestion()}
      <form onSubmit={search}>
        <input
          type="search"
          autoFocus={true}
          onChange={changeKeyword}
          placeholder=" Search for a word"
        />
        <input type="submit" />
      </form>

      <h2 className="search-word">{searchWord}</h2>
      <div className="phonetic-pronunciation">{phoenticPronunciation}</div>

      <div className="definition">{definitions}</div>
    </div>
  );
}
