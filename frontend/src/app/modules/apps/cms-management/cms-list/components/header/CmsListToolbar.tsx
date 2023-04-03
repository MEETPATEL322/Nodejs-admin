import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

const CmsListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddCmsModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-cms-table-toolbar='base'>
      {/* <NewsListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add cms */}
      <button type='button' className='btn btn-primary' onClick={openAddCmsModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Cms
      </button>
      {/* end::Add cms */}
    </div>
  )
}

export {CmsListToolbar}
