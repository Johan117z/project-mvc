import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>project-mvc</h1>
      <ul>
        <li>
          <Link href="/client/person">Persons</Link>
        </li>
        <li>
          <Link href="/location/state">States</Link>
        </li>
      </ul>
    </main>
  );
}
