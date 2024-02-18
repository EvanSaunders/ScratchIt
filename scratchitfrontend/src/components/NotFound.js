import React, { useEffect, Component } from 'react';
import Appbar from "./Appbar";
import silogo from "../assets/scratchit-01.png";




function NotFound() {


    return (

        <div className="dark:bg-gray-800 min-h-screen">
            <Appbar />
            <div className="flex-1 flex justify-center items-center text-black dark:text-white">
                <div className="mt-8">
                    <h1 className="text-5xl">404 Not Found</h1>
                </div>
            </div>
        </div>


    );
}

export default NotFound;
