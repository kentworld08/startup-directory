declare module "next-auth" {
  interface session {
    id: string;
  }
  interface JWT {
    id: string;
  }
}

declare module "@hookform/resolvers/zod" {
  import { Resolver } from "react-hook-form";
  import { ZodType, ZodTypeDef } from "zod";

  export function zodResolver<
    TOutput,
    TInput = TOutput,
    TDef extends ZodTypeDef = ZodTypeDef,
  >(schema: ZodType<TOutput, TDef, TInput>): Resolver<TOutput>;
}
