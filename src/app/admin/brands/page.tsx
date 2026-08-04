import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default async function BrandPage() {

  return (

    <>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Brand Mobil

        </h1>

        <p className="text-gray-500">

          Kelola Brand Kendaraan

        </p>

      </div>

      <Table
        title="Daftar Brand"
        action={<Button>+ Tambah Brand</Button>}
      >

        <EmptyState title="Belum ada Brand"/>

      </Table>

    </>

  );

}
