/**
 * @file      PipeOperator.ts
 * @author    Gage Sorrell <gage@sorrell.sh>
 * @copyright (c) 2026 Gage Sorrell
 * @license   MIT
 */

import { type _, Curry, type TArgumentVectorWithCurry, type TCurriedArgumentVector, type TCurriedFunction } from "@sorrell/functional";
import { PipedFunction } from "./PipeOperator.Internal";
import type { TFunction } from "./PipeOperator.Internal.Types";

/**
 * Wrap functions with this to pass them to the pipe operator.
 * 
 * @template ArgumentVectorType - The type of the argument vector of the given {@link Function}.
 * @template ThisReturnType - The return type of the given {@link Function}.
 * 
 * @param Function - The function to receive value(s) of {@link ArgumentVectorType} from the pipe operator.
 * 
 * @returns {PipedFunction<Parameters<typeof Function>, ReturnType<typeof Function>>} The function,
 * wrapped in an internal class that overloads the `%` operator.
 * 
 * @example
 * ```typescript
 * "use tsover";
 * import { Pipe as P } from "@sorrell/pipe-operator";
 *
 * const Value: number = 40;
 *
 * const Product = (...Values: Array<number>): number =>
 *      Values.reduce((Prev, Curr) => Prev * Curr, 1);
 *
 * const FormatDollar = (In: number): string => `$${ In }`;
 * 
 * const Price = Value 
 *    % P(Product, 3, 2)
 *    % P(FormatDollar);
 * // `Price` <- `"$240"`
 * ```
 */
export function Pipe<
    ArgumentVectorType extends Array<unknown>,
    ThisReturnType
>(
    Function: TFunction<ArgumentVectorType, ThisReturnType>
): PipedFunction<Parameters<typeof Function>, ReturnType<typeof Function>>
/**
 * Wrap functions with this to pass them to the pipe operator.
 * This overload allows you to curry functions as well, by calling {@link Curry} internally.
 * 
 * @template ArgumentVectorType - The type of the argument vector of the given {@link Function}.
 * @template ThisReturnType - The return type of the given {@link Function}.
 * @template CurriedVectorType - The type of the argument vector containing the fixed values
 * of {@link Function}, and the values left open via {@link _}.
 * 
 * @param Function - The function to receive value(s) of {@link ArgumentVectorType} from the pipe operator.
 * @param CurriedArgumentVector - The argument vector containing fixed values, and {@link _} to mark arguments
 * as open in the resulting function.
 * 
 * @returns {PipedFunction<TCurriedArgumentVector<Parameters<typeof Function>, typeof CurriedArgumentVector>>, ReturnType<typeof Function>>}
 * The function, wrapped in an internal class that overloads the `%` operator.
 * 
 * @example
 * ```typescript
 * "use tsover";
 * import { Pipe as P } from "@sorrell/pipe-operator";
 *
 * const Value: number = 40;
 *
 * const Product = (...Values: Array<number>): number =>
 *      Values.reduce((Prev, Curr) => Prev * Curr, 1);
 *
 * const FormatDollar = (In: number): string => `$${ In }`;
 * 
 * const Price = Value 
 *    % P(Product, 3, 2)
 *    % P(FormatDollar);
 * // `Price` <- `"$240"`
 * ```
 */
export function Pipe<
    ArgumentVectorType extends Array<unknown>,
    ThisReturnType,
    CurriedVectorType extends TArgumentVectorWithCurry<ArgumentVectorType>
>(
    Function: TFunction<ArgumentVectorType, ThisReturnType>,
    ...CurriedArgumentVector: CurriedVectorType
): PipedFunction<TCurriedArgumentVector<Parameters<typeof Function>, typeof CurriedArgumentVector>, ReturnType<typeof Function>>
export function Pipe<
    ArgumentVectorType extends Array<unknown>,
    ThisReturnType,
    CurriedVectorType extends TArgumentVectorWithCurry<ArgumentVectorType>
>(
    Function: TFunction<ArgumentVectorType, ThisReturnType>,
    ...CurriedArgumentVector: CurriedVectorType
)
{
    if (CurriedArgumentVector.length > 0)
    {
        const Curried = Curry(Function, ...CurriedArgumentVector);
        return new PipedFunction(Curried);
    }
    else
    {
        return new PipedFunction(Function);
    }
}
