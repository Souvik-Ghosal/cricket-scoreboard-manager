import { Input, Notification } from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { HiChevronDown, HiOutlineExclamationCircle } from 'react-icons/hi';
import { useScoreboard } from '../../contexts/ScoreboardContext';

const AddTeamPlayers = ({ team }: { team: 'team-1' | 'team-2' }) => {
  // @ts-ignore
  const { getTeamPlayers, setTeamOnePlayers, setTeamTwoPlayers, reset } =
    useScoreboard();

  const [teamPlayers, setTeamPlayers] = useState<string[]>([]);
  const [isMaxPlayer, setIsMaxPlayer] = useState(false);

  useEffect(() => {
    setTeamPlayers(getTeamPlayers(team));
  }, [getTeamPlayers, team]);

  const handleAddPlayer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (teamPlayers.length == 11) {
      setIsMaxPlayer(true);

      setTimeout(() => {
        setIsMaxPlayer(false);
      }, 2000);
    } else {
      if (team === 'team-1') {
        setTeamOnePlayers([...teamPlayers, e.currentTarget.player.value]);
      } else {
        setTeamTwoPlayers([...teamPlayers, e.currentTarget.player.value]);
      }
    }

    e.currentTarget.player.value = '';
  };

  return (
    <div className="max-w-sm w-[50%] bg-gray-100 p-3 rounded-md shadow-md">
      <div className="mt-3 text-lg">
        {team == 'team-1' ? 'Team 1' : 'Team 2'}
      </div>

      <hr />

      {/* display team members */}
      <div className="flex flex-col gap-1 my-3 pl-3">
        {teamPlayers.map((player: any, idx: any) => (
          <div key={idx} className="capitalize">
            {idx + 1} {player}
          </div>
        ))}
      </div>

      {/* add players */}
      <form
        onSubmit={(e) => {
          handleAddPlayer(e);
        }}
      >
        <Input name="player" placeholder="add a new player" />
      </form>

      {/* max player reached */}
      {isMaxPlayer && (
        <div className="absolute bottom-3 right-3">
          <Notification
            disallowClose
            color={'red'}
            icon={<HiOutlineExclamationCircle size={20} />}
          >
            Max player is 11
          </Notification>
        </div>
      )}
    </div>
  );
};

const GameSetup = () => {
  // @ts-ignore
  const { reset, setGameType, setCurrPage } = useScoreboard();

  const gameTypes = [
    {
      name: 'T20',
      overs: 20,
    },
    {
      name: 'One-Day',
      overs: 50,
    },
  ];

  return (
    <div>
      {/* game type select */}
      <div className="flex flex-row justify-between items-center max-w-md mx-auto w-[90%] my-6">
        <div>Select Type of Game</div>
        <Input
          component="select"
          rightSection={<HiChevronDown size={14} />}
          className="w-[60%]"
          onChange={(e: { target: { value: any } }) => {
            setGameType(e.target.value);
          }}
        >
          {gameTypes.map((gameType) => (
            <option key={gameType.name} value={gameType.name}>
              {gameType.name}
            </option>
          ))}
        </Input>
      </div>

      {/* team setup */}
      <div className="flex flex-row flex-wrap w-full  justify-evenly gap-3 px-[10%]  my-12">
        <AddTeamPlayers team="team-1" />
        <AddTeamPlayers team="team-2" />
      </div>

      {/* start */}
      <div className="my-6 flex flex-row justify-center gap-3">
        <button
          className="bg-gray-700 text-white px-4 py-1.5 rounded-sm shadow-sm"
          onClick={() => {
            reset();
          }}
        >
          Create New Game
        </button>
        <button
          className="bg-primary-light text-white px-4 py-1.5 rounded-sm shadow-sm"
          onClick={() => {
            setCurrPage('scoreboard');
          }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
