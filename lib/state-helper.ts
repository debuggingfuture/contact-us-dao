import { produce, applyPatches, enablePatches } from 'immer';

enablePatches();

export const compileEndState = (state, patches) => {
    const results = applyPatches(state, patches);

    return results;
};
