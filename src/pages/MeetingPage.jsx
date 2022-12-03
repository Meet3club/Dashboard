import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Meeting from "../components/Meeting";
// Icons
import { RiLineChartLine, RiHashtag } from "react-icons/ri";

function MeetingPage() {
    return (
        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
            <Sidebar />
            <main className="lg:col-span-3 xl:col-span-5 bg-gradient-to-r via-purple-500 from-blue-500 to-purple-700 p-8 h-[100vh] overflow-y-scroll">
                <Header />
                <Meeting />
            </main>
        </div>
    );
}

export default MeetingPage;
