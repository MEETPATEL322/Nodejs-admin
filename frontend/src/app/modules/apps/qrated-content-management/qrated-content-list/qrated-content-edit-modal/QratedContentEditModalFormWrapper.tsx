import {useQuery} from 'react-query'
import {QratedContentEditModalForm} from './QratedContentEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getQratedContentById} from '../core/_requests'
import { QratedContentEditModalHeader } from './QratedContentEditModalHeader'

const QratedContentEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: qratedContent,
    error,
  } = useQuery(
    `${QUERIES.QRATED_CONTENT_LIST}-qrated-content-${itemIdForUpdate}`,
    () => {
      return getQratedContentById(itemIdForUpdate)
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
    return <><QratedContentEditModalHeader isEdit={false} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><QratedContentEditModalForm isQratedContentLoading={isLoading} qratedContent={{_id: undefined}} /></div></>
  }

  if (!isLoading && !error && qratedContent) {
    return <><QratedContentEditModalHeader isEdit={true} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><QratedContentEditModalForm isQratedContentLoading={isLoading} qratedContent={qratedContent} /></div></>
  }

  return null
}

export {QratedContentEditModalFormWrapper}
