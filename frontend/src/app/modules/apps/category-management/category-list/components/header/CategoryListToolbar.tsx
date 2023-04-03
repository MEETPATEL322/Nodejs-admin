import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {CategoryListFilter} from './CategoryListFilter'

const CategoryListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddCategoryModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-category-table-toolbar='base'>
      {/* <CategoryListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add category */}
      <button type='button' className='btn btn-primary' onClick={openAddCategoryModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Category
      </button>
      {/* end::Add category */}
    </div>
  )
}

export {CategoryListToolbar}
