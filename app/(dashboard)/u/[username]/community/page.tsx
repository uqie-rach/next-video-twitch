import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

const CommunityPage = async () => {
  const data = await getBlockedUsers();

  const formattedData = data.map((item) => ({
    ...item,
    userId: item.blocked.id,
    username: item.blocked.username,
    imageUrl: item.blocked.imageUrl,
    createdAt: format(new Date(item.blocked.createdAt), 'dd/MM/yyyy'),
  }));

  console.log(formattedData)

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className='text-2xl font-bold'>Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />

    </div>
  )
}

export default CommunityPage;
