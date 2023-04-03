import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {CategoryListHeader} from './components/header/CategoryListHeader'
import {CategoryTable} from './table/CategoryTable'
import {CategoryEditModal} from './category-edit-modal/CategoryEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToastContainer } from 'react-toastify';

const CategoryList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <ToastContainer />
      <KTCard>
        <CategoryListHeader />
        <CategoryTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CategoryEditModal />}
    </>
  )
}

const CategoryListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CategoryList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CategoryListWrapper}
