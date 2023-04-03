import {FC} from 'react'

type Props = {
  data?: string
}

const CmsDataCell: FC<Props> = ({data}) => (
  <> {data && <div dangerouslySetInnerHTML={{__html: data}}></div>}</>
)

export {CmsDataCell}
