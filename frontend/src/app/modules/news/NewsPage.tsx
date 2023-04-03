import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
// import { AccountHeader } from '../accounts/AccountHeader'
import List from './components/list/cards/List'
import { CreateNews } from './components/News'
import { NewsUpdate } from './NewsUpdate'

//import {  } from './components/News'

// import { News } from './components/News'
// import News from './components/News'


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Admin',
    path: '/crafted/news/create',
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

const NewsPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            {/* <AccountHeader /> */}
            <Outlet />
          </>
        }
      >
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Create</PageTitle>
                <CreateNews/>
            </>
          }
        />
        <Route
          path='update'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Update</PageTitle>
                <NewsUpdate/>
            </>
          }
        />
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>List</PageTitle>
              <List />
            </>
          }
        />
        <Route index element={<Navigate to='/crafted/news/create' />} />
      </Route>
    </Routes>
  )
}

export default NewsPage
