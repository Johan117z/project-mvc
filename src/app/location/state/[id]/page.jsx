import StateEdit from "@/view/location/state/state-edit";

export default async function StateEditPage({ params }) {
  const { id } = await params;
  return <StateEdit id={id} />;
}
