import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {NewsListWrapper} from './news-list/NewsList'

const newsBreadcrumbs: Array<PageLink> = [
  {
    title: 'News Management',
    path: '/apps/news-management/news',
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

const NewsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='news'
          element={
            <>
              <PageTitle breadcrumbs={newsBreadcrumbs}>News list</PageTitle>
              <NewsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/news-management/news' />} />
    </Routes>
  )
}

export default NewsPage
