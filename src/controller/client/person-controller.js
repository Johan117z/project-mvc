import AppError from "@/assets/library/app-error";
import parseId from "@/assets/library/parse-id";
import PersonModel from "@/model/client/person-model";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns the clean data, or throws 400 listing every invalid field.
function validate(data) {
  const errors = {};
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  const phone = typeof data?.phone === "string" ? data.phone.trim() : "";

  if (!name || name.length > 100) errors.name = "Required, up to 100 characters";
  if (!EMAIL_PATTERN.test(email) || email.length > 150) errors.email = "A valid email is required (up to 150 characters)";
  if (phone.length > 20) errors.phone = "Up to 20 characters";

  if (Object.keys(errors).length > 0) {
    throw new AppError(400, "Invalid data", errors);
  }
  return { name, email, phone: phone || null };
}

async function assertEmailAvailable(email, currentId) {
  const existing = await PersonModel.findByEmail(email);
  if (existing && existing.id !== currentId) {
    throw new AppError(409, "Email is already registered");
  }
}

export default class PersonController {
  static async getAll() {
    return PersonModel.findAll();
  }

  static async getById(id) {
    const person = await PersonModel.findById(parseId(id));
    if (!person) throw new AppError(404, "Person not found");
    return person;
  }

  static async create(data) {
    const person = validate(data);
    await assertEmailAvailable(person.email);
    return PersonModel.insert(person);
  }

  static async update(id, data) {
    const personId = parseId(id);
    await PersonController.getById(personId);
    const person = validate(data);
    await assertEmailAvailable(person.email, personId);
    return PersonModel.update(personId, person);
  }

  static async remove(id) {
    const personId = parseId(id);
    await PersonController.getById(personId);
    try {
      await PersonModel.delete(personId);
    } catch (error) {
      // The foreign key (user.person_id) uses ON DELETE RESTRICT.
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        throw new AppError(409, "Person has related users and cannot be deleted");
      }
      throw error;
    }
  }
}
