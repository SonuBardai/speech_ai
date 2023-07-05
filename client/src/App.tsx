import ChatWindow from "./components/ChatWindow";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_ADDR = `${SERVER_HOST}:${SERVER_PORT}`;
const ELEVEN_LABS_API_KEY = process.env.REACT_APP_ELEVEN_LABS_API_KEY;

function App() {
  return (
    <div>
      <ChatWindow
        SERVER_ADDR={SERVER_ADDR}
        ELEVEN_LABS_API_KEY={ELEVEN_LABS_API_KEY}
      />
    </div>
  );
}

export default App;
