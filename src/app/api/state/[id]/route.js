import { handle } from "@/assets/library/handle-request";
import StateController from "@/controller/location/state-controller";

export const GET = handle((request, { id }) => StateController.getById(id));

export const PUT = handle(async (request, { id }) => StateController.update(id, await request.json()));

export const DELETE = handle((request, { id }) => StateController.remove(id), 204);
