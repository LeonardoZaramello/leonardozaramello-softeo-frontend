export interface userListInfos {
  key: number
  parcela: number
  valor: string
  dia: string
  pago: string
}

export interface user {
  _id: string
  userName: string
  email: string
  service: string
  value: number
  instalment: number
  firsPaymentDay: Date
  payed: boolean
  createdAt: Date
  updatedAt: Date
  instalmentInfos: []
}

export interface DataType {
  key: React.Key
  cliente: string
  email: string
  serviço: string
  valor: number
  parcelas: number
  data: string
}
export interface nestedDataType {
  key: React.Key
  parcela: string
  valor: string
  dia: number
  pago: string
}

export interface nestedType {
  number: number
  value: string
  paymentDay: string
  payed: boolean
}


