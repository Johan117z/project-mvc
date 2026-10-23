import AppError from "@/assets/library/app-error";

// Turns the `[id]` URL segment into a positive integer, or throws 400.
export default function parseId(id) {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new AppError(400, "Invalid id");
  }
  return parsed;
}
