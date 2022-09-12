interface infosInterface {
  instalmentInfos: {
    number: number,
    value: number,
    paymentDay: Date,
    payed: boolean
    }
}

type Infos<T> = {
  infos: T[]
}

export function UsersTableInfos<T extends infosInterface>(props: Infos<T>) {
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
  function bgColor(index:number) {
    if(index % 2 === 0) return 'bg-white'
    return 'bg-gray-100'
  }
  return (

    <table>

      <thead>
        <tr>
          <th >Parcela</th>
          <th >Valor</th>
          <th >Dia</th>
          <th >Pago</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td ></td>
          <td ></td>
          <td ></td>
          <td ></td>
        </tr>
      </tbody>
    </table>



  );
}
