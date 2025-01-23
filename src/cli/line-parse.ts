import {removeColor} from '@augment-vir/common';

export function cleanLine(line: string): string {
    return removeColor(line).replace(/^\[[^\]]+\]\s*/, '');
}

// eslint-disable-next-line sonarjs/slow-regex
const tsErrorLineRegexp = /^\s*(?<filePath>.+):\d+:\d+ - error TS\d+: /;
const tsErrorsDoneRegexp = /^\s*Found \d+ errors?./;

export function parseLine(line: string) {
    const cleanedLine = cleanLine(line);

    const filePath: string = tsErrorLineRegexp.exec(cleanedLine)?.groups?.filePath || '';
    const isLastTsOutput: boolean = !!tsErrorsDoneRegexp.exec(cleanedLine);

    return {
        filePath,
        isLastTsOutput,
    };
}
