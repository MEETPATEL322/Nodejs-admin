import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

const QratedContentListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddQratedContentModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-qrated-content-table-toolbar='base'>

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add qrated-content */}
      <button type='button' className='btn btn-primary' onClick={openAddQratedContentModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Curated Content
      </button>
      {/* end::Add qrated-content */}
    </div>
  )
}

export {QratedContentListToolbar}
