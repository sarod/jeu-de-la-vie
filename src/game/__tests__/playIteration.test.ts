import { describe, expect, test } from '@jest/globals';

import { playIteration } from "../playIteration";

describe('playIteration', () => {
    test('Dead matrix should stay dead', () => {
        expect(
            playIteration([
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ])
        )
            .toEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]);
    });

    test('Crowded matrix should die', () => {
        expect(
            playIteration([
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ])
        )
            .toEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]);
    });


    test('Isolated cell should die', () => {
        expect(
            playIteration([
                [false, false, false],
                [false, true, false],
                [false, false, false]
            ])
        )
            .toEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]);
    });

    test('Square of cell should survive', () => {
        expect(
            playIteration([
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ])
        )
            .toEqual([
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ]);
    });

    test('Cell with 3 neighbours should be born', () => {
        expect(
            playIteration([
                [false, false, false, false],
                [false, true, false, false],
                [false, true, true, false],
                [false, false, false, false]
            ])
        )
            .toEqual([
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ]);
    });
});