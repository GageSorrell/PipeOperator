/**
 * @file      PipeOperator.Internal.Types.ts
 * @author    Gage Sorrell <gage@sorrell.sh>
 * @copyright (c) 2026 Gage Sorrell
 * @license   MIT
 */

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
