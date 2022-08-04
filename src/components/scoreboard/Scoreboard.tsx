import { Input } from '@mantine/core';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
} from 'react-icons/hi';
import { useScoreboard } from '../../contexts/ScoreboardContext';

const Scoreboard = () => {
  // @ts-ignore
  const { teamOnePlayers, teamTwoPlayers, setGameType } = useScoreboard();
  // @ts-ignore
  const { setTeamOnePlayers, setTeamTwoPlayers, getGameType } = useScoreboard();
  // @ts-ignore
  const { getTeamPlayers, reset, currPage } = useScoreboard();
  // @ts-ignore
  const { setCurrPage, teamOneScore, setTeamOneScore } = useScoreboard();
  // @ts-ignore
  const { teamTwoScore, setTeamTwoScore, currBowler } = useScoreboard();
  // @ts-ignore
  const { setCurrBowler, currBatsman, setCurrBatsman } = useScoreboard();
  // @ts-ignore
  const { isTeamOneBatting, setIsTeamOneBatting } = useScoreboard();
  // @ts-ignore
  const { currOver, setCurrOver } = useScoreboard();

  const totalOvers = getGameType() === 'T-20' ? 20 : 50;

  const handleBattingTeamChange = (team: string) => {
    if (team == 'team-1') {
      setIsTeamOneBatting(true);
    } else {
      setIsTeamOneBatting(false);
    }

    setCurrBatsman(0);
    setCurrBowler(0);
    setCurrOver(0);
  };

  return (
    <div className="p-3">
      <div className="my-8 flex flex-row justify-center items-center gap-5">
        <div>
          <div>Current Batting Team:</div>
          <div className="text-sm text-gray-500">
            (Don't change in the middle of game)
          </div>
        </div>
        <Input
          component="select"
          rightSection={<HiOutlineChevronDown size={14} />}
          onChange={(e: { target: { value: any } }) => {
            handleBattingTeamChange(e.target.value);
          }}
        >
          <option value="team-1">Team 1</option>
          <option value="team-2">Team 2</option>
        </Input>
      </div>

      {/*  */}
      <div className="flex flex-row gap-5 max-w-xl mx-auto justify-evenly bg-gray-100 p-3 my-3 items-center rounded-sm shadow-md">
        <div>
          <div>Bowling</div>
          <div>{isTeamOneBatting ? 'Team 2' : 'Team 1'}</div>
        </div>

        <div>
          <div>Batting</div>
          <div>{isTeamOneBatting ? 'Team 1' : 'Team 2'}</div>
        </div>

        <div>
          <div>Score (Team 1)</div>
          <div>{teamOneScore}</div>
        </div>

        <div>
          <div>Score (Team 1)</div>
          <div>{teamTwoScore}</div>
        </div>

        <div>
          <div>Over</div>
          <div>
            {Math.floor(currOver / 6)}.{currOver % 6}/{totalOvers}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-5 rounded-md shadow-md my-10 max-w-2xl mx-auto flex flex-row justify-between">
        <div>
          <div>
            Current Bowler:{' '}
            <span>
              {isTeamOneBatting
                ? teamTwoPlayers[currBowler]
                : teamOnePlayers[currBowler]}
            </span>
          </div>
        </div>

        <div>
          <div>
            Current Batsman:{' '}
            <span>
              {isTeamOneBatting
                ? teamOnePlayers[currBatsman]
                : teamTwoPlayers[currBatsman]}
            </span>
          </div>
        </div>
      </div>

      {/* controller */}
      <div className="bg-gray-200 max-w-2xl mx-auto rounded-md shadow-md p-5">
        <div className="text-lg mb-4">Controller</div>
        <hr />

        <div className="flex flex-row justify-evenly items-center">
          {/* bowler change */}
          <div>
            <div>
              Bowler <span>{currBowler + 1}</span>/11
            </div>
            <div className="flex flex-row gap-4">
              <HiOutlineChevronLeft
                className="cursor-pointer"
                onClick={() => {
                  setCurrBowler(currBowler - 1);
                }}
              />
              <HiOutlineChevronRight
                className="cursor-pointer"
                onClick={() => {
                  setCurrBowler(currBowler + 1);
                }}
              />
            </div>
          </div>

          {/* batsman change */}
          <div>
            <div>
              Batsman <span>{currBatsman}</span>/11
            </div>
            <div className="flex flex-row gap-4">
              <HiOutlineChevronLeft
                className="cursor-pointer"
                onClick={() => {
                  setCurrBatsman(currBatsman - 1);
                }}
              />
              <HiOutlineChevronRight
                className="cursor-pointer"
                onClick={() => {
                  setCurrBatsman(currBatsman + 1);
                }}
              />
            </div>
          </div>

          {/* next ball */}
          {/* <button className="bg-primary-light text-white px-2 py-1 rounded-md shadow-sm">
            Next Ball
          </button> */}
        </div>

        {/* run update */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (isTeamOneBatting) {
              setTeamOneScore(
                teamOneScore + parseInt(e.currentTarget.run.value)
              );
            } else {
              setTeamTwoScore(
                teamTwoScore + parseInt(e.currentTarget.run.value)
              );
            }

            setCurrOver(currOver + 1);

            e.currentTarget.run.value = 0;
          }}
        >
          <Input
            className="max-w-xs mx-auto mt-5"
            placeholder="Enter run"
            type={'number'}
            name="run"
          ></Input>
        </form>
      </div>
    </div>
  );
};

export default Scoreboard;
