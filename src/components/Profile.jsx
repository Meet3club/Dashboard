import React from "react";
import Tabs from "../components/Holdings/Tabs"
import MeetingC from "../MeetingC";


const Meeting = () => {
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold align-middle pt-9">
                Start the meeting !
            </h1>
            <Tabs />
        </div>
    );
};

export default Meeting;
