import {useListView} from '../../core/ListViewProvider'
import { CategoryListGrouping } from './CategoryListGrouping'
import {CategoryListSearchComponent} from './CategoryListSearchComponent'
// import { CategoryListToolbar } from './CategoryListToolbar'

const CategoryListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CategoryListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 && <CategoryListGrouping /> }
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CategoryListHeader}
