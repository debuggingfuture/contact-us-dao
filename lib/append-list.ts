import { produce, applyPatches, enablePatches } from 'immer';

enablePatches();

export const compileBufferAppendListAsMap = (state, ...buffers: Buffer[]) => {
    const patches = buffers
        .map((buffer) => {
            return JSON.parse(buffer.toString());
        })
        .flat();
    console.log(patches);
    const results = applyPatches(state, patches);

    return results;
};
