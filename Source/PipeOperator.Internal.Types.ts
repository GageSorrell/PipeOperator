/**
 * @file      PipeOperator.Internal.Types.ts
 * @author    Gage Sorrell <gage@sorrell.sh>
 * @copyright (c) 2026 Gage Sorrell
 * @license   MIT
 */

type TMaybeReadonlyArray<ElementType> =
    | Array<ElementType>
    | ReadonlyArray<ElementType>;

export type TReadonlyArrayFrom<ArrayType extends TMaybeReadonlyArray<unknown>> =
    readonly [ ...ArrayType ];

export type TPipeArgument<ArgumentType> =
    ArgumentType extends ReadonlyArray<unknown>
        ? ArgumentType
        : readonly [ ArgumentType ];

/**
 * A `ReadonlyArray` of a given {@link ElementType} that is
 * nonempty.
 * 
 * @template ElementType - The type of the elements in this `ReadonlyArray`.
 */
export type TReadonlyArrayNonempty<ElementType> = 
    readonly [ ElementType ]
    | readonly [ ElementType, ...Array<ElementType> ];

/**
 * An `Array` of a given {@link ElementType} that is nonempty.
 * 
 * @template ElementType - The type of the elements in this `Array`.
 */
export type TArrayNonempty<ElementType> = 
    | [ ElementType ]
    | [ ElementType, ...Array<ElementType> ];

export type TCtorFunction<ArgumentVectorType extends unknown, ThisReturnType> =
    ArgumentVectorType extends Array<unknown>
        ? (...ArgumentVector: ArgumentVectorType) => ThisReturnType
        : (Argument: ArgumentVectorType) => ThisReturnType;

export type TLeft<ArgumentType extends Array<unknown>> =
    ArgumentType["length"] extends number
        ? (
            ArgumentType extends Array<infer ElementType>
                ? (
                    | ElementType
                    | ArgumentType
                )
                : never
        )
        : ArgumentType extends [ infer InnerType ]
            ? InnerType
            : ArgumentType;

export type TSingleton<ArgumentType extends Array<unknown>> =
    ArgumentType extends [ infer InnerType ]
        ? InnerType
        : ArgumentType;

export type TFunction<ArgumentVectorType extends Array<unknown>, ReturnType = void> =
    (...ArgumentVector: ArgumentVectorType) => ReturnType;

export type Temp<ArgumentVectorType extends Array<unknown>, Other extends Array<unknown> = never> =
    ArgumentVectorType["length"] extends 0
        ? Other["length"] extends number
            ? Other
            : ArgumentVectorType
        : Other;
