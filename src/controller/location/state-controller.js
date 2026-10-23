import AppError from "@/assets/library/app-error";
import parseId from "@/assets/library/parse-id";
import StateModel from "@/model/location/state-model";

// Returns the clean data, or throws 400 listing every invalid field.
function validate(data) {
  const errors = {};
  const postalCode = typeof data?.postalCode === "string" ? data.postalCode.trim() : "";
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const description = typeof data?.description === "string" ? data.description.trim() : "";

  if (!postalCode || postalCode.length > 10) errors.postalCode = "Required, up to 10 characters";
  if (!name || name.length > 100) errors.name = "Required, up to 100 characters";
  if (description.length > 255) errors.description = "Up to 255 characters";

  if (Object.keys(errors).length > 0) {
    throw new AppError(400, "Invalid data", errors);
  }
  return { postalCode, name, description: description || null };
}

export default class StateController {
  static async getAll() {
    return StateModel.findAll();
  }

  static async getById(id) {
    const state = await StateModel.findById(parseId(id));
    if (!state) throw new AppError(404, "State not found");
    return state;
  }

  static async create(data) {
    return StateModel.insert(validate(data));
  }

  static async update(id, data) {
    const stateId = parseId(id);
    await StateController.getById(stateId);
    return StateModel.update(stateId, validate(data));
  }

  static async remove(id) {
    const stateId = parseId(id);
    await StateController.getById(stateId);
    try {
      await StateModel.delete(stateId);
    } catch (error) {
      // The foreign key (city.state_id) uses ON DELETE RESTRICT.
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        throw new AppError(409, "State has related cities and cannot be deleted");
      }
      throw error;
    }
  }
}
