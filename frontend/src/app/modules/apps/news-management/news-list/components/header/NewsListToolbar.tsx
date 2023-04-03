import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

const NewsListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddNewsModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-news-table-toolbar='base'>

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add news */}
      <button type='button' className='btn btn-primary' onClick={openAddNewsModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add News
      </button>
      {/* end::Add news */}
    </div>
  )
}

export {NewsListToolbar}
