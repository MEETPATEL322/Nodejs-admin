import { ToastContainer, toast } from 'react-toastify';
import { KTCard } from '../../../../../_metronic/helpers';
import { CmsEditModal } from './cms-edit-modal/CmsEditModal';
import { CmsListHeader } from './components/header/CmsListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { CmsTable } from './table/CmsTable';

const CmsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <ToastContainer />
      <KTCard>
        <CmsListHeader />
        <CmsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CmsEditModal />}
    </>
  )
}

const CmsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CmsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CmsListWrapper}
