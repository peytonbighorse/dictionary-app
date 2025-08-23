import "./Dictionary.css";
import { useState } from "react";
import axios from "axios";
export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [definitions, setDefinitions] = useState(null);

  function changeKeyword(event) {
    setKeyword(event.target.value);
  }
  function clearResults() {
    setDefinitions(null);
  }
  function handleError(error) {
    clearResults();
    setDefinitions(
      <div>
        <div>Word not found...</div>
        <div>Please try again.</div>
      </div>
    );
  }
  function getDefinition(response) {
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
          <h2 className="search-word">{response.data.word}</h2>
          <div className="phonetic-pronunciation">{response.data.phonetic}</div>
          {meaningsArray.map(function (i, index) {
            function getSynonyms() {
              let synonyms = response.data.meanings[index].synonyms;
              function clickLink(event) {
                event.preventDefault();
                let newWord = event.target.id;
                const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
                const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${newWord}&key=${apiKey}`;
                axios.get(apiUrl).then(getDefinition).catch(handleError);
              }
              if (synonyms) {
                return (
                  <div className="Synonyms">
                    <div className="synonym-title">Similar: </div>

                    {synonyms.map(function (i, index) {
                      return (
                        <div
                          onClick={clickLink}
                          key={index}
                          className="synonym"
                          id={i}
                        >
                          {i}
                        </div>
                      );
                    })}
                  </div>
                );
              } else {
                return null;
              }
            }
            return (
              <div className="definition-entry" key={index}>
                <div className="part-of-speech">
                  {response.data.meanings[index].partOfSpeech}
                </div>
                <div className="meaning">
                  {response.data.meanings[index].definition}
                </div>
                <div className="example">{checkExample(index)}</div>
                {getSynonyms()}
              </div>
            );
          })}
        </div>
      );
    }

    setSearchWord(response.data.word);
    setDefinitions(returnMeanings());

    return null;
  }
  function search(event) {
    event.preventDefault();
    const apiKey = `aef1757e37906f8atc32b9da5odbc24a`;
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(getDefinition).catch(handleError);
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

      <div className="definition">{definitions}</div>
    </div>
  );
}
