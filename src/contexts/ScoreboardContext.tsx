import {
  createContext,
  ReactNode,
  useContext,
  useState,
  SetStateAction,
} from 'react';

const ScoreboardContext = createContext({});
const useScoreboard = () => useContext(ScoreboardContext);

const ScoreboardContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameType, setGameType] = useState<string>('T-20');
  const [teamOnePlayers, setTeamOnePlayers] = useState<string[]>([]);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState<string[]>([]);
  const [currPage, setCurrPage] = useState<string>('home');

  const [teamOneScore, setTeamOneScore] = useState<number>(0);
  const [teamTwoScore, setTeamTwoScore] = useState<number>(0);
  const [isTeamOneBatting, setIsTeamOneBatting] = useState<boolean>(true);
  const [isTeamOneWon, setIsTeamOneWon] = useState<boolean>(false);
  const [currBowler, setCurrBowler] = useState<number>(0);
  const [currBatsman, setCurrBatsman] = useState<number>(0);

  const [currOver, setCurrOver] = useState<number>(0);

  const reset = () => {
    setGameType('T-20');
    setTeamOnePlayers([]);
    setTeamTwoPlayers([]);
  };

  const getGameType = () => {
    return gameType;
  };

  const getTeamPlayers = (team: string) => {
    return team === 'team-1' ? teamOnePlayers : teamTwoPlayers;
  };

  return (
    <ScoreboardContext.Provider
      value={{
        teamOnePlayers,
        teamTwoPlayers,
        setGameType,
        setTeamOnePlayers,
        setTeamTwoPlayers,
        getGameType,
        getTeamPlayers,
        reset,
        currPage,
        setCurrPage,
        teamOneScore,
        setTeamOneScore,
        teamTwoScore,
        setTeamTwoScore,
        currBowler,
        setCurrBowler,
        currBatsman,
        setCurrBatsman,
        isTeamOneBatting,
        setIsTeamOneBatting,
        currOver,
        setCurrOver,
      }}
    >
      {children}
    </ScoreboardContext.Provider>
  );
};

export { ScoreboardContextProvider, useScoreboard };
