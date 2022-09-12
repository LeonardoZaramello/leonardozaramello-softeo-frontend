interface user {
  _id: string
  createdAt: Date
  instalment: number
  payed: boolean
  paymentDay: Date
  service: string
  updatedAt: Date
  userName: string
  value: number
}

type User<T> = {
  users: T[]
}

export function UsersTable<T extends user>(props: User<T>) {
  // _id: string
  // createdAt: Date
  // instalment: number
  // payed: boolean
  // paymentDay: Date
  // service: string
  // updatedAt: Date
  // userName: string
  // value: number
  const list = [{
    nome: 'a',
    idade: 21
  },
  {
    nome: 'b',
    idade: 21
  },
  {
    nome: 'c',
    idade: 21
  },
  {
    nome: 'd',
    idade: 21
  }]
  console.log(props.users);
  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Valor</th>
            <th>Parcela</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.service}</td>
                <td>{user.value}</td>
                <td>{user.instalment}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h1>alo</h1>
    </div>
  );
}
