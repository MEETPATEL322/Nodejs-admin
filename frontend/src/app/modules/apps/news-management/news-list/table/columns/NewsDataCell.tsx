import {FC} from 'react'

type Props = {
  data?: string
}

const NewsDataCell: FC<Props> = ({data}) => (
  <> {data && <div dangerouslySetInnerHTML={{__html: data}}></div>}</>
)

export {NewsDataCell}
