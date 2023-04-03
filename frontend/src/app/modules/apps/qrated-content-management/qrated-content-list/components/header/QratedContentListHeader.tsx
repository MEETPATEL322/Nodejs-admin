import {useListView} from '../../core/ListViewProvider'
import {QratedContentListToolbar} from './QratedContentListToolbar'
import {QratedContentListGrouping} from './QratedContentListGrouping'
import {QratedContentListSearchComponent} from './QratedContentListSearchComponent'

const QratedContentListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <QratedContentListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <QratedContentListGrouping /> : <QratedContentListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {QratedContentListHeader}
