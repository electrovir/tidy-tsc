import {logColors} from '@augment-vir/common';
import {describe, itCases} from '@augment-vir/test';
import {cleanLine, parseLine} from './line-parse.js';

describe(cleanLine.name, () => {
    itCases(cleanLine, [
        {
            it: 'removes leading package names',
            input: '[@rest-vir/implement-service] npx tsc -b --pretty exited with code 0',
            expect: 'npx tsc -b --pretty exited with code 0',
        },
        {
            it: 'removes color',
            input: `${logColors.faint} npx tsc -b --pretty exited with code 0${logColors.reset}`,
            expect: ' npx tsc -b --pretty exited with code 0',
        },
    ]);
});

describe(parseLine.name, () => {
    itCases(parseLine, [
        {
            it: 'finds the failed file path with a package prefix',
            input: "[@rest-vir/run-service] src/handle-endpoint/handlers/handle-cors.test.ts:2:9 - error TS2305: Module '\"@augment-vir/common\"' has no exported member 'AnyOrigin'.",
            expect: {
                filePath: 'src/handle-endpoint/handlers/handle-cors.test.ts',
                isLastTsOutput: false,
            },
        },
        {
            it: 'finds the failed file path',
            input: "src/handle-endpoint/handlers/handle-cors.test.ts:2:9 - error TS2305: Module '\"@augment-vir/common\"' has no exported member 'AnyOrigin'.",
            expect: {
                filePath: 'src/handle-endpoint/handlers/handle-cors.test.ts',
                isLastTsOutput: false,
            },
        },
        {
            it: 'finds the singular error end with package prefix',
            input: '[@rest-vir/run-service] Found 1 error.',
            expect: {
                filePath: '',
                isLastTsOutput: true,
            },
        },
        {
            it: 'finds the singular error end',
            input: 'Found 1 error.',
            expect: {
                filePath: '',
                isLastTsOutput: true,
            },
        },
        {
            it: 'finds the errors end with package prefix',
            input: '[@rest-vir/run-service] Found 3 errors.',
            expect: {
                filePath: '',
                isLastTsOutput: true,
            },
        },
        {
            it: 'finds the errors end',
            input: 'Found 3 errors.',
            expect: {
                filePath: '',
                isLastTsOutput: true,
            },
        },
    ]);
});
