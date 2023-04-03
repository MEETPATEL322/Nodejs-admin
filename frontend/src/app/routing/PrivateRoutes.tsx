import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
// import AdminPage from '../modules/apps/admin/AdminPage'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const NewsOldPage = lazy(() => import('../modules/news/NewsPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const AdminPage = lazy(() => import('../modules/apps/admin/AdminPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const NewsPage = lazy(() => import('../modules/apps/news-management/NewsPage'))
  const CmsPage = lazy(() => import('../modules/apps/cms-management/CmsPage'))
  const QratedContentPage = lazy(() => import('../modules/apps/qrated-content-management/QratedContentPage'))
  const CategoryPage = lazy(() => import('../modules/apps/category-management/CategoryPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {/* <Route path='auth/*' element={<Navigate to='/dashboard' />} /> */}
        <Route path='auth/*' element={<Navigate to='/apps/news-management/news' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />

        {/* News.. */}

        <Route
          path='crafted/news/*'
          element={
            <SuspensedView>
              <NewsOldPage />
            </SuspensedView>
          }
        />

        {/* QuratedContaints.. */}

        {/* <Route
          path='apps/quratedcon/*'
          element={
            <SuspensedView>
              <QuratedconPage />
            </SuspensedView>
          }
        /> */}

        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
         {/* <Route
          path='apps/admin/*'
          element={
            <SuspensedView>
              <AdminPage />
            </SuspensedView>
          }
        /> */}
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/news-management/*'
          element={
            <SuspensedView>
              <NewsPage />
            </SuspensedView>
          }
        />
          <Route
          path='apps/cms-management/*'
          element={
            <SuspensedView>
              <CmsPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/qrated-content-management/*'
          element={
            <SuspensedView>
              <QratedContentPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/category-management/*'
          element={
            <SuspensedView>
              <CategoryPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
