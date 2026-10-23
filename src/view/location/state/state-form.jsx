"use client";

import { useEffect, useState } from "react";

const EMPTY_STATE = { postalCode: "", name: "", description: "" };

// Creates a state, or edits one when `id` is given. `onSaved` runs after a successful save.
export default function StateForm({ id, onSaved }) {
  const [state, setState] = useState(EMPTY_STATE);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;
    fetch(`/api/state/${id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error((await response.json()).error);
        const loaded = await response.json();
        setState({ ...EMPTY_STATE, ...loaded, description: loaded.description ?? "" });
      })
      .catch((error) => setFormError(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});
    setFormError("");

    const response = await fetch(id ? `/api/state/${id}` : "/api/state", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    if (!response.ok) {
      const body = await response.json();
      setFieldErrors(body.details ?? {});
      setFormError(body.error);
      return;
    }

    if (!id) setState(EMPTY_STATE);
    onSaved?.();
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Postal code
        <input name="postalCode" value={state.postalCode} onChange={handleChange} />
        {fieldErrors.postalCode && <span className="field-error">{fieldErrors.postalCode}</span>}
      </label>
      <label>
        Name
        <input name="name" value={state.name} onChange={handleChange} />
        {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
      </label>
      <label>
        Description
        <input name="description" value={state.description} onChange={handleChange} />
        {fieldErrors.description && <span className="field-error">{fieldErrors.description}</span>}
      </label>
      {formError && !Object.keys(fieldErrors).length && <p className="form-error">{formError}</p>}
      <button type="submit">{id ? "Save" : "Add state"}</button>
    </form>
  );
}
