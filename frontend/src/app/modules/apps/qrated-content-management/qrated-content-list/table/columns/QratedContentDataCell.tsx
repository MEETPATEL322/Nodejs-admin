import {FC} from 'react'

type Props = {
  data?: string
}

const QratedContentDataCell: FC<Props> = ({data}) => (
  <> {data && <div dangerouslySetInnerHTML={{__html: data}}></div>}</>
)

export {QratedContentDataCell}
