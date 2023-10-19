import { serverClient } from '@/lib/trpc/server';

export default async function Dashboard() {
  const balance = await serverClient.balance.getBalance();
  console.log(balance);
  // const shippingHistory = await serverClient.
  return (
    <main className='flex flex-col gap-6 px-5 py-7 '>
      <h1 className='heading'>Welcome Back!</h1>
      <section className='h-32 flex flex-col justify-between card p-5'>
        <p className='font-bold'>Balance</p>
        <p className='text-4xl'>$ {balance ? balance[0].amount : '0.00'}</p>
      </section>
      <section className='flex flex-col gap-6'>
        <h2 className='subheading'>Shipping History</h2>

        <div className='w-full card overflow-x-scroll'>
          <table className='border-collapse text-left overflow-x-scroll'>
            <thead>
              <tr className='border-b border-purple-200/20'>
                <th className='p-5'>Invoice#</th>
                <th className='p-5'>Date</th>
                <th className='p-5'>Size</th>
                <th className='p-5'>Type</th>
                <th className='p-5'>Price</th>
                <th className='p-5'>Files</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-purple-200/20 text-xs'>
                <td className='p-5'>PG0001</td>
                <td className='p-5'>10/11/2023</td>
                <td className='p-5'>200</td>
                <td className='p-5'>Priority</td>
                <td className='p-5'>$420.69</td>
                <td className='p-5'>^</td>
              </tr>
              <tr className='border-b border-purple-200/20 text-xs'>
                <td className='p-5'>PG0001</td>
                <td className='p-5'>10/11/2023</td>
                <td className='p-5'>200</td>
                <td className='p-5'>Priority</td>
                <td className='p-5'>$420.69</td>
                <td className='p-5'>^</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
