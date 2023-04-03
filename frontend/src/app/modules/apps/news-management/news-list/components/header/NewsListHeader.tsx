import {useListView} from '../../core/ListViewProvider'
import {NewsListToolbar} from './NewsListToolbar'
import {NewsListGrouping} from './NewsListGrouping'
import {NewsListSearchComponent} from './NewsListSearchComponent'

const NewsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <NewsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <NewsListGrouping /> : <NewsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {NewsListHeader}
