"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonForm from "@/view/client/person/person-form";

export default function PersonEdit({ id }) {
  const router = useRouter();

  return (
    <section>
      <h1>Edit person</h1>
      <PersonForm id={id} onSaved={() => router.push("/client/person")} />
      <p>
        <Link href="/client/person">Back to list</Link>
      </p>
    </section>
  );
}
