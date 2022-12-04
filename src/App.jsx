import React from 'react';
// import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import MeetingPage from './pages/MeetingPage';
import ProfilePage from './pages/ProfilePage';
// import Meeting from './components/Meeting';
// import About from './pages/about';
// import Blogs from './pages/blogs';
// import SignUp from './pages/signup';
// import Contact from './pages/contact';

function App() {
return (
	<Router>
	<Routes>
		<Route exact path='/' element={<DashboardPage />} />
		<Route path='/meeting' element={<MeetingPage />} />
		<Route path='/profile' element={<ProfilePage />} />
	</Routes>
	</Router>
);
}

export default App;
