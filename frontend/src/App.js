import "../src/App.css"
import { Route } from "react-router-dom";
import Chatspage from "./Pages/Chatspage";
import Homepage from "./Pages/Homepage";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact></Route>
      <Route path="/chats" component={Chatspage}></Route>
    </div>
  );
}

export default App;
