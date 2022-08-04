import { BrowserRouter, Link } from 'react-router-dom';
import { useScoreboard } from '../../contexts/ScoreboardContext';

const NavBar: React.FC = () => {
  // @ts-ignore
  const { currPage, setCurrPage } = useScoreboard();

  const urlList: any[] = [];

  return (
    <nav className="bg-primary-light text-white px-[10%] py-3 flex flex-row justify-between items-center ">
      {/* <BrowserRouter> */}
      <div
        className="text-xl cursor-pointer"
        onClick={() => {
          setCurrPage('home');
        }}
      >
        Cricket Scoreboard Manager
      </div>
      {/* </BrowserRouter> */}

      <ul className="flex flex-row gap-4 text-lg capitalize">
        {urlList?.map((url) => (
          <li key={url.name}>
            <a href={url.url}>{url.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
