import {
    atom
} from 'recoil';

const artistsState = atom({
    key: 'artistsState',
    default: [],
});

export default artistsState;