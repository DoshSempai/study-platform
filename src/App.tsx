import React from 'react';
import Test from './Test';

interface Child {
    text: string;
};

interface State {
    type: string;
    children: Child[];
};

const App = () => (
    <div className="wrapper">
        <div className="item"></div>
        <Test />
    </div>
)

export default App;
