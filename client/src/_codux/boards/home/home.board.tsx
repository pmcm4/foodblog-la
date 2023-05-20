import { createBoard } from '@wixc3/react-board';
import { Home } from '../../../components/home/home';

export default createBoard({
    name: 'Home',
    Board: () => <Home />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
