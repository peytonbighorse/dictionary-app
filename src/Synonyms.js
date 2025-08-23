import "./Synonyms.css";
export default function Synonyms(props) {
  const synonyms = props.synonyms;

  function clickLink(event) {
    event.preventDefault();
    alert("hello");
  }
  if (synonyms) {
    return (
      <div className="Synonyms">
        <div className="synonym-title">Similar: </div>

        {synonyms.map(function (i, index) {
          return (
            <div onClick={clickLink} key={index} className="synonym">
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
