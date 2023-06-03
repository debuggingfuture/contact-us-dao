// import Keyv from 'keyv';
// const keyv = new Keyv();

// not using keyv due to missing EventEmitter at Nextjs Edge
const keyv = new Map();

export const getKvClient = () => {
    //TODO more handling
    return keyv;
};
