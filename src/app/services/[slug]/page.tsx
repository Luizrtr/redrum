import Template from "@/components/Template";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Template slug="services" title="Services">
      <div>My services: {params.slug}</div>
    </Template>
  )
}
export default Page;