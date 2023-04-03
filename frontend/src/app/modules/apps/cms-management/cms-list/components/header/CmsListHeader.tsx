import {useListView} from '../../core/ListViewProvider'
import { CmsListGrouping } from './CmsListGrouping'
import { CmsListSearchComponent } from './CmsListSearchComponent'
import { CmsListToolbar } from './CmsListToolbar'

const CmsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CmsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <CmsListGrouping /> : <CmsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CmsListHeader}
