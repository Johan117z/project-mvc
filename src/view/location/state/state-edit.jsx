"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import StateForm from "@/view/location/state/state-form";

export default function StateEdit({ id }) {
  const router = useRouter();

  return (
    <section>
      <h1>Edit state</h1>
      <StateForm id={id} onSaved={() => router.push("/location/state")} />
      <p>
        <Link href="/location/state">Back to list</Link>
      </p>
    </section>
  );
}
