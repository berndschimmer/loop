import Audio from "./Audio";
import "./App.css";

const App = () => {
  const redordings = [1, 2, 3, 4, 5, 6];
  return (
    <div className="App">
      <div>
        {redordings.map((key) => (
          <Audio key={key} record={key}></Audio>
        ))}
      </div>
    </div>
  );
};

export default App;
