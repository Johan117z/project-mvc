"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import StateForm from "@/view/location/state/state-form";

export default function StateList() {
  const [stateList, setStateList] = useState([]);
  const [error, setError] = useState("");

  const loadStateList = useCallback(async () => {
    const response = await fetch("/api/state");
    if (!response.ok) {
      setError("Could not load states");
      return;
    }
    setStateList(await response.json());
  }, []);

  useEffect(() => {
    loadStateList();
  }, [loadStateList]);

  async function handleDelete(id) {
    setError("");
    const response = await fetch(`/api/state/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError((await response.json()).error);
      return;
    }
    loadStateList();
  }

  return (
    <section>
      <h1>States</h1>
      <StateForm onSaved={loadStateList} />
      {error && <p className="form-error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Postal code</th>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {stateList.map((state) => (
            <tr key={state.id}>
              <td>{state.postalCode}</td>
              <td>{state.name}</td>
              <td>{state.description}</td>
              <td>
                <Link href={`/location/state/${state.id}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(state.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
