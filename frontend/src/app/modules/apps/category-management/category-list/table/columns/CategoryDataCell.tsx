import {FC} from 'react'

type Props = {
  data?: string
}

const CategoryDataCell: FC<Props> = ({data}) => (
  <> {data && <div>{data}</div>}</>
)

export {CategoryDataCell}
