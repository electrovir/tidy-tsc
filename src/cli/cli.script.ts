import {logColors, removeColor} from '@augment-vir/common';
import {createInterface} from 'node:readline';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const tsErrorLineRegexp = /^(?<filePath>.+):\d+:\d+ - error TS\d+: /;
const tsErrorsDoneRegexp = /^Found \d+ errors./;

enum ReadState {
    Anything = 'anything',
    InsideTsOutput = 'inside-ts-output',
}

let currentState = ReadState.Anything;
const currentFiles = new Set<string>();

readline.on('line', (line) => {
    const filePath = tsErrorLineRegexp.exec(removeColor(line))?.groups?.filePath;
    const isLastTsOutput = !!tsErrorsDoneRegexp.exec(removeColor(line));

    if (filePath) {
        currentFiles.add(filePath);
        currentState = ReadState.InsideTsOutput;
    } else if (currentState === ReadState.InsideTsOutput && isLastTsOutput) {
        process.stdout.write(`Failed files (${currentFiles.size}):\n\n`);
        currentFiles.forEach((filePath) => {
            process.stdout.write(logColors.error + filePath + '\n');
        });
        process.stdout.write(`\n`);
        currentFiles.clear();

        currentState = ReadState.Anything;
    } else if (currentState === ReadState.Anything) {
        process.stdout.write(line + '\n');
    }
});
