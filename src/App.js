// import logo from "./logo.png";
// import "./App.css";
import loguito from "./loguito.png";
import "./App.css";
import { userNames } from "./userList";
import { useState } from "react";

// Components
import ProgressBar from "./components/ProgressBar";
import Spinner from "./components/Spinner";

function App() {
  // States
  const [users, setUsers] = useState(userNames);
  const [winners, setWinner] = useState([]);

  const [uiProps, setUiProps] = useState({
    buttonDisabled: false,
    displayProgressBarr: false,
  });

  const [error, setError] = useState({
    processTime: 3000,
    loading: false,
  });
  // Utility functions
  let randomName;
  function getRandomName() {
    return (randomName = users[Math.floor(Math.random() * userNames.length)]);
  }
  // Handlers
  const handleGetRandomName = () => {
    setUiProps({
      buttonDisabled: true,
      displayProgressBarr: true,
    });
    setTimeout(() => {
      getRandomName();
      console.log(randomName);

      if (typeof randomName === "undefined") {
        // handle error
        setError({ processTime: 1000, loading: true });
        handleGetRandomName();
      } else {
        // Add random name to winner list
        setWinner([...winners, randomName]);
        // Update and Remove the random name form users
        const updateNameList = users.filter((user) => user !== randomName);

        setUsers(updateNameList);

        setUiProps({
          buttonDisabled: false,
          displayProgressBarr: false,
        });
        setError({
          processTime: 3000,
          loading: false,
        });
      }
    }, error.processTime);
    // console.log(getRandomName());
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul id="userList">
          {users.map((user, index) => (
            <li className="list-item" key={index}>
              {user}
            </li>
          ))}
        </ul>
        <div className="react-container">
          {uiProps.displayProgressBarr && <ProgressBar />}
          {error.loading ? (
            <Spinner />
          ) : (
            <img src={loguito} className="App-logo" alt="logo" />
          )}

          <h1>Randomizer</h1>

          <button
            onClick={handleGetRandomName}
            disabled={uiProps.buttonDisabled}
          >
            Get random name
          </button>
        </div>
        <ul className="winners">
          {winners.map((winner, index) => (
            <li key={index} className="list-item">
              {winner}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
