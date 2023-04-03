import { FC } from 'react'

type Props = {
  is_active?: boolean
}

const CmsIsActiveCell: FC<Props> = ({ is_active }) => (
  <>
    {
      is_active ?
      <div className='badge badge-light-success fw-bolder'>Active</div>
      : 
      <div className='badge badge-light-danger fw-bolder'>In Active</div>
    }
  </>
)

export { CmsIsActiveCell }
