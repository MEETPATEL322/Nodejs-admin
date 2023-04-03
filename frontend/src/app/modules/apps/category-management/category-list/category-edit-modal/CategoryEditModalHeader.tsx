import { FC } from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

type Props = {
  isEdit: boolean
}

const CategoryEditModalHeader: FC<Props> = ({isEdit}) => {
// const CategoryEditModalHeader = () => {
  const {setItemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{isEdit ? "Edit" : 'Add'} Category</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-category-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {CategoryEditModalHeader}
