import { handle } from "@/assets/library/handle-request";
import PersonController from "@/controller/client/person-controller";

export const GET = handle(() => PersonController.getAll());

export const POST = handle(async (request) => PersonController.create(await request.json()), 201);
