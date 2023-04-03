import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {NewsListHeader} from './components/header/NewsListHeader'
import {NewsTable} from './table/NewsTable'
import {NewsEditModal} from './news-edit-modal/NewsEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToastContainer } from 'react-toastify';

const NewsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <ToastContainer />
      <KTCard>
        <NewsListHeader />
        <NewsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <NewsEditModal />}
    </>
  )
}

const NewsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <NewsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {NewsListWrapper}
