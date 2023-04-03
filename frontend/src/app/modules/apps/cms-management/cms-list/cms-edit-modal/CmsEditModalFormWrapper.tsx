import {useQuery} from 'react-query'
// import {NewsEditModalForm} from './NewsEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import { getCmsById } from '../core/_requests'
import { CmsEditModalForm } from './CmsEditModalForm'
import { CmsEditModalHeader } from './CmsEditModalHeader'
// import {getNewsById} from '../core/_requests'

const CmsEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: cms,
    error,
  } = useQuery(
    `${QUERIES.CMS_LIST}-cms-${itemIdForUpdate}`,
    () => {
      return getCmsById(itemIdForUpdate)
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
    return <><CmsEditModalHeader isEdit={false} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><CmsEditModalForm isCmsLoading={isLoading} cms={{_id: undefined}} /> </div></>
  }

  if (!isLoading && !error && cms) {
    return <><CmsEditModalHeader isEdit={true} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><CmsEditModalForm isCmsLoading={isLoading} cms={cms} /> </div></>
  }

  return null
}

export {CmsEditModalFormWrapper}
