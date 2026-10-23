import PersonEdit from "@/view/client/person/person-edit";

export default async function PersonEditPage({ params }) {
  const { id } = await params;
  return <PersonEdit id={id} />;
}
