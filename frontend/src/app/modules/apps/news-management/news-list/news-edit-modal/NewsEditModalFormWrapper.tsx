import {useQuery} from 'react-query'
import {NewsEditModalForm} from './NewsEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getNewsById} from '../core/_requests'
import { NewsEditModalHeader } from './NewsEditModalHeader'

const NewsEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: news,
    error,
  } = useQuery(
    `${QUERIES.NEWS_LIST}-news-${itemIdForUpdate}`,
    () => {
      return getNewsById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <><NewsEditModalHeader isEdit={false} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><NewsEditModalForm isNewsLoading={isLoading} news={{_id: undefined}} /></div></>
  }

  if (!isLoading && !error && news) {
    return <><NewsEditModalHeader isEdit={true} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><NewsEditModalForm isNewsLoading={isLoading} news={news} /></div></>
  }

  return null
}

export {NewsEditModalFormWrapper}