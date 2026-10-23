import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>project-mvc</h1>
      <Link href="/client/person">Persons</Link>
    </main>
  );
}
