import { FC } from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

type Props = {
  isEdit: boolean
}

const QratedContentEditModalHeader: FC<Props> = ({isEdit}) => {

  const {setItemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{isEdit ? "Edit" : 'Add'} Curated Content</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-qrated-content-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {QratedContentEditModalHeader}
