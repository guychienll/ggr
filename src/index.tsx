import '@/base.scss';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Desktop, Mobile } from './components/UserList';
import { useDevice } from './hooks/window';

const App: React.FC = () => {
    const { device } = useDevice();

    return (
        <div className="text-[#ffffff] bg-[#3B3B3B] min-h-[100dvh] ">
            {device === 'mobile' && <Mobile />}
            {device === 'desktop' && <Desktop />}
        </div>
    );
};

const root = () => {
    let root = document.getElementById('root');

    if (root) {
        return root;
    } else {
        root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
        return root;
    }
};

ReactDOM.createRoot(root()).render(<App />);
