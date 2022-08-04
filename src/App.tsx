import HomePage from './components/homePage/HomePage';
import './styles/App.scss';
import Scoreboard from './components/scoreboard/Scoreboard';
import { useScoreboard } from './contexts/ScoreboardContext';

function App() {
  // @ts-ignore
  const { currPage, setCurrPage } = useScoreboard();

  return (
    // <BrowserRouter>
    //   {/* <HomePage /> */}
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/scoreboard" element={<Scoreboard />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      {currPage == 'home' && <HomePage />}
      {currPage == 'scoreboard' && <Scoreboard />}
    </div>
  );
}

export default App;
