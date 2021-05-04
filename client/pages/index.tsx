import * as React from 'react';
import Link from 'next/link';

import routers from '../common/constants/router';
import SeoHead from '../components/common/seoHead';
import { ticTacToeApi } from '../api/ticTacToe';
import TicTacToeIcon from '../public/asset/icons/tictactoe';
import RobotIcon from '../public/asset/icons/robot';
import PlayerBlueIcon from '../public/asset/icons/player-blue';
import PlayerIcon from '../public/asset/icons/player';
import ChessBoardIcon from '../public/asset/icons/chess';
import { useRouter } from 'next/router';

export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
    const router = useRouter();

    const handleCreateBot = () => {
        ticTacToeApi.createBot().then((res) => {
            const roomId = res.data.data.roomId;
            router.push(`${routers.ticTacToePvP.link}/${roomId}`);
        });
    };

    return (
        <>
            <SeoHead {...routers.home.header} />
            <div className="flex-1 chess-bg">
                <div className="max-w-4xl mx-4 my-16 md:mx-auto ">
                    <div className="flex flex-col space-y-2 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-10 md:space-y-0">
                        <button
                            className="p-4 space-y-4 duration-100 transform rounded-md shadow-xl bg-woodsmoke-500 hover:scale-105 hover:bg-gray-900"
                            onClick={() => handleCreateBot()}
                        >
                            <div className="text-center ">
                                <h1 className="text-3xl font-bold text-mercury">Tic Tac Toe</h1>
                                <h2 className="font-medium text-mercury-600">Player VS BOT</h2>
                                <div className="w-1/2 h-1 mx-auto bg-gray-600"></div>
                            </div>
                            <div className="flex items-center justify-around">
                                <div>
                                    <PlayerIcon />
                                </div>
                                <div>
                                    <TicTacToeIcon />
                                </div>
                                <div>
                                    <RobotIcon />
                                </div>
                            </div>
                        </button>

                        <Link href="/">
                            <a
                                href="/"
                                className="p-4 space-y-4 duration-100 transform rounded-md shadow-xl bg-woodsmoke-500 hover:scale-105 hover:bg-gray-900"
                            >
                                <div className="text-center ">
                                    <h1 className="text-3xl font-bold text-mercury">Chess</h1>
                                    <h2 className="font-medium text-mercury-600">Player VS BOT</h2>
                                    <div className="w-1/2 h-1 mx-auto bg-gray-600"></div>
                                </div>
                                <div className="flex items-center justify-around">
                                    <div>
                                        <PlayerIcon />
                                    </div>
                                    <div>
                                        <ChessBoardIcon />
                                    </div>
                                    <div>
                                        <RobotIcon />
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <Link href={routers.ticTacToePvP.link}>
                            <a className="p-4 space-y-4 duration-100 transform rounded-md shadow-xl bg-woodsmoke-500 hover:scale-105 hover:bg-gray-900">
                                <div className="text-center ">
                                    <h1 className="text-3xl font-bold text-mercury">Tic Tac Toe</h1>
                                    <h2 className="font-medium text-mercury-600">Player VS Player</h2>
                                    <div className="w-1/2 h-1 mx-auto bg-gray-600"></div>
                                </div>
                                <div className="flex items-center justify-around">
                                    <div>
                                        <PlayerIcon />
                                    </div>
                                    <div>
                                        <TicTacToeIcon />
                                    </div>
                                    <div>
                                        <PlayerBlueIcon />
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <Link href="/">
                            <a
                                href="/"
                                className="p-4 space-y-4 duration-100 transform rounded-md shadow-xl bg-woodsmoke-500 hover:scale-105 hover:bg-gray-900"
                            >
                                <div className="text-center ">
                                    <h1 className="text-3xl font-bold text-mercury">Chess</h1>
                                    <h2 className="font-medium text-mercury-600">Player VS Player</h2>
                                    <div className="w-1/2 h-1 mx-auto bg-gray-600"></div>
                                </div>
                                <div className="flex items-center justify-around">
                                    <div>
                                        <PlayerIcon />
                                    </div>
                                    <div>
                                        <ChessBoardIcon />
                                    </div>
                                    <div>
                                        <PlayerBlueIcon />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
