import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dictionary from "./Dictionary";
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary</h1>
      </header>
      <main>
        <Dictionary />
      </main>
      <footer className="App-footer">
        Coded by Peyton Bighorse and hosted on{" "}
        <a
          href="https://pmb-dictionary-app.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>
      </footer>
    </div>
  );
}
