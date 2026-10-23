"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PersonForm from "@/view/client/person/person-form";

export default function PersonList() {
  const [personList, setPersonList] = useState([]);
  const [error, setError] = useState("");

  const loadPersonList = useCallback(async () => {
    const response = await fetch("/api/person");
    if (!response.ok) {
      setError("Could not load persons");
      return;
    }
    setPersonList(await response.json());
  }, []);

  useEffect(() => {
    loadPersonList();
  }, [loadPersonList]);

  async function handleDelete(id) {
    setError("");
    const response = await fetch(`/api/person/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError((await response.json()).error);
      return;
    }
    loadPersonList();
  }

  return (
    <section>
      <h1>Persons</h1>
      <PersonForm onSaved={loadPersonList} />
      {error && <p className="form-error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {personList.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>
                <Link href={`/client/person/${person.id}`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
