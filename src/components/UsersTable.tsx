import { UsersTableInfos } from "./UsersTableInfos"

interface user {
  _id: string
  userName: string
  service: string
  value: number
  instalment: number
  firsPaymentDay: Date
  payed: boolean
  createdAt: Date
  updatedAt: Date
  instalmentInfos: []
}

type User<T> = {
  users: T[]
}

export function UsersTable<T extends user>(props: User<T>) {
  // {
  //   "_id": "631ee73016a8950108a31126",
  //   "userName": "Gustavo",
  //   "service": "Limpeza",
  //   "value": 300,
  //   "instalment": 3,
  //   "firsPaymentDay": "2022-06-05T00:00:00.000Z",
  //   "payed": true,
  //   "instalmentInfos": [
  //   {
  //   "number": 1,
  //   "value": "100.00",
  //   "paymentDay": "2022-06-05T00:00:00.000Z",
  //   "payed": true
  //   },
  //   {
  //   "number": 2,
  //   "value": "100.00",
  //   "paymentDay": "2022-08-04T00:00:00.000Z",
  //   "payed": false
  //   },
  //   {
  //   "number": 3,
  //   "value": "100.00",
  //   "paymentDay": "2022-09-03T00:00:00.000Z",
  //   "payed": false
  //   }
  //   ],
  //   "createdAt": "2022-09-12T08:00:48.520Z",
  //   "updatedAt": "2022-09-12T08:00:48.520Z",
  //   "__v": 0
  //   },
  console.log(props.users);

  function bgColor(index:number) {
    if(index % 2 === 0) return 'bg-white'
    return 'bg-gray-100'
  }
  return (
    <div className="overflow-auto rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Cliente</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Serviço</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Valor</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Parcelas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {
            props.users?.map((user, index) => (
              <tr key={index} className={`flex ${bgColor(index)} hover:bg-blue-100 cursor-pointer`}>
                <td className="w-24 p-3 text-sm text-gray-700 whitespace-nowrap">{user.userName}</td>
                <td className="w-24 p-3 text-sm text-gray-700 whitespace-nowrap">{user.service}</td>
                <td className="w-8 p-3 text-sm text-gray-700 whitespace-nowrap">{user.value}</td>
                <td className="w-8 p-3 text-sm text-gray-700 whitespace-nowrap">{user.instalment}</td>
                <UsersTableInfos infos={user.instalmentInfos} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
