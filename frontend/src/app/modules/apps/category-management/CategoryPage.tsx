import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CategoryListWrapper} from './category-list/CategoryList'

const categoryBreadcrumbs: Array<PageLink> = [
  {
    title: 'Category Management',
    path: '/apps/category-management/category',
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

const CategoryPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='category'
          element={
            <>
              <PageTitle breadcrumbs={categoryBreadcrumbs}>Category list</PageTitle>
              <CategoryListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/category-management/category' />} />
    </Routes>
  )
}

export default CategoryPage
