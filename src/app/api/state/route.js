import { handle } from "@/assets/library/handle-request";
import StateController from "@/controller/location/state-controller";

export const GET = handle(() => StateController.getAll());

export const POST = handle(async (request) => StateController.create(await request.json()), 201);
