"use client";

import { useEffect, useState } from "react";

const EMPTY_PERSON = { name: "", email: "", phone: "" };

// Creates a person, or edits one when `id` is given. `onSaved` runs after a successful save.
export default function PersonForm({ id, onSaved }) {
  const [person, setPerson] = useState(EMPTY_PERSON);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;
    fetch(`/api/person/${id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error((await response.json()).error);
        const loaded = await response.json();
        setPerson({ ...EMPTY_PERSON, ...loaded, phone: loaded.phone ?? "" });
      })
      .catch((error) => setFormError(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleChange(event) {
    setPerson({ ...person, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});
    setFormError("");

    const response = await fetch(id ? `/api/person/${id}` : "/api/person", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });

    if (!response.ok) {
      const body = await response.json();
      setFieldErrors(body.details ?? {});
      setFormError(body.error);
      return;
    }

    if (!id) setPerson(EMPTY_PERSON);
    onSaved?.();
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={person.name} onChange={handleChange} />
        {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
      </label>
      <label>
        Email
        <input name="email" value={person.email} onChange={handleChange} />
        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
      </label>
      <label>
        Phone
        <input name="phone" value={person.phone} onChange={handleChange} />
        {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
      </label>
      {formError && !Object.keys(fieldErrors).length && <p className="form-error">{formError}</p>}
      <button type="submit">{id ? "Save" : "Add person"}</button>
    </form>
  );
}
