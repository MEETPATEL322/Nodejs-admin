/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'

type Props = {
  image?: string,
  title?: string,
}

const CmsInfoCell: FC<Props> = ({image, title}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {image ? (
          <div className='symbol-label'>
            <img src={(`${process.env.REACT_APP_API_URL}/${image}`)} alt={title} className='w-100' />
          </div>
        ) : (
          <div
            className={clsx(
              'symbol-label fs-3',
              `bg-light-danger`,
              `text-danger`
            )}
          >
            {title}
          </div>
        )}
      </a>
    </div>
  </div>
)

export {CmsInfoCell}
