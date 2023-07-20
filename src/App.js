import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuestTable from './components/QuestTable';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quests/goblin-plains-encampment" element={<QuestTable />} />
            </Routes>
        </Router>
    );
}

export default App;
