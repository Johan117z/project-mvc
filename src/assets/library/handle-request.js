import { NextResponse } from "next/server";
import AppError from "@/assets/library/app-error";

// Wraps a controller call: returns its result as JSON, or the matching error response.
export function handle(action, successStatus = 200) {
  return async (request, context) => {
    try {
      const params = context?.params ? await context.params : {};
      const result = await action(request, params);
      if (successStatus === 204) {
        return new NextResponse(null, { status: 204 });
      }
      return NextResponse.json(result, { status: successStatus });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json(
          { error: error.message, details: error.details },
          { status: error.status },
        );
      }
      if (error instanceof SyntaxError) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
      }
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}
