import { handle } from "@/assets/library/handle-request";
import PersonController from "@/controller/client/person-controller";

export const GET = handle((request, { id }) => PersonController.getById(id));

export const PUT = handle(async (request, { id }) => PersonController.update(id, await request.json()));

export const DELETE = handle((request, { id }) => PersonController.remove(id), 204);
