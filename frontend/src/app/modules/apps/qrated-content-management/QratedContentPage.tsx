import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {QratedContentListWrapper} from './qrated-content-list/QratedContentList'

const qratedContentBreadcrumbs: Array<PageLink> = [
  {
    title: 'Curated Content Management',
    path: '/apps/qrated-content-management/qrated-content',
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

const QratedContentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='qrated-content'
          element={
            <>
              <PageTitle breadcrumbs={qratedContentBreadcrumbs}>Curated Content list</PageTitle>
              <QratedContentListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/qrated-content-management/qrated-content' />} />
    </Routes>
  )
}

export default QratedContentPage
