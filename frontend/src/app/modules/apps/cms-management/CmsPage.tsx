import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { CmsListWrapper } from './cms-list/CmsList'

const cmsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Cms Management',
    path: '/apps/cms-management/cms',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CmsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='cms'
          element={
            <>
              <PageTitle breadcrumbs={cmsBreadcrumbs}>Cms list</PageTitle>
              <CmsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/cms-management/cms' />} />
    </Routes>
  )
}

export default CmsPage
