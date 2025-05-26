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

  export function zodResolver<T extends ZodType<any, ZodTypeDef, any>>(
    schema: T
  ): Resolver<ReturnType<T["_output"]>>;
}
