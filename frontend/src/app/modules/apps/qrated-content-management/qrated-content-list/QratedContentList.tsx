import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {QratedContentListHeader} from './components/header/QratedContentListHeader'
import {QratedContentTable} from './table/QratedContentTable'
import {QratedContentEditModal} from './qrated-content-edit-modal/QratedContentEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToastContainer } from 'react-toastify';

const QratedContentList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <ToastContainer />
      <KTCard>
        <QratedContentListHeader />
        <QratedContentTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <QratedContentEditModal />}
    </>
  )
}

const QratedContentListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <QratedContentList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {QratedContentListWrapper}
