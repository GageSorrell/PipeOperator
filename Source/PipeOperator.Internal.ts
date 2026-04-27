/**
 * @file      PipeOperator.Internal.ts
 * @author    Gage Sorrell <gage@sorrell.sh>
 * @copyright (c) 2026 Gage Sorrell
 * @license   MIT
 */

import type { TFunction, TLeft } from "./PipeOperator.Internal.Types";
import { Operator } from "tsover-runtime";

export class PipedFunction<ArgumentVectorType extends Array<unknown>, ThisReturnType>
{
    public constructor(
        public readonly Function: TFunction<ArgumentVectorType, ThisReturnType>
    ) { }

    public [Operator.percent](
        Left: TLeft<Parameters<typeof Right.Function>>,
        Right: typeof this
    ): ReturnType<typeof Right.Function>
    {
        function IsLeftVector(In: unknown): In is Parameters<typeof Right.Function>
        {
            return Array.isArray(In);
        }

        function IsLeftSingleton(In: unknown): In is Exclude<TLeft<Parameters<typeof Right.Function>>, Parameters<typeof Right.Function>>
        {
            return !IsLeftVector(In);
        }

        if (IsLeftVector(Left))
        {
            // return (Right.Function as (...ArgumentVector: Extract<typeof Left, Array<unknown>>) => ReturnType<typeof Right.Function>)(...Left);
            return Right.Function(...Left);
        }
        else if (IsLeftSingleton(Left))
        {
            return Right.Function(...[ Left ] as Parameters<typeof Right.Function>);
        }
        else
        {
            throw new Error();
        }

    }
}
