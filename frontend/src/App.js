import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyFigure from './components/MyFigure';
import MySection from './components/MySection';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import QuestionDetail from './components/QuestionDetail';
import Discussion from './components/Discussion'
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/dashboard' && location.pathname !== '/chat' && location.pathname !== '/forum' && location.pathname !== '/forum2' && <Navbar />}
      <Routes>
        <Route path="/" element={
          <div style={{ overflowY: 'auto', height: '100%', scrollSnapType: 'y mandatory' }}>
            <div style={{ height: '80vh', width: '100%', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <main className='flex justify-between'>
                <MySection />
                <MyFigure />
              </main>
            </div>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/forum" element={<QuestionDetail />} />
        <Route path="/forum2" element={<Discussion />} />
      </Routes>
    </>
  );
}

export default App;
