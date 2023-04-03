import {useQuery} from 'react-query'
import {CategoryEditModalForm} from './CategoryEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getCategoryById} from '../core/_requests'
import { CategoryEditModalHeader } from './CategoryEditModalHeader'

const CategoryEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: category,
    error,
  } = useQuery(
    `${QUERIES.CATEGORY_LIST}-category-${itemIdForUpdate}`,
    () => {
      return getCategoryById(itemIdForUpdate)
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
    return <><CategoryEditModalHeader isEdit={false} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><CategoryEditModalForm isCategoryLoading={isLoading} category={{_id: undefined}} /> </div></>
  }

  if (!isLoading && !error && category) {
    return <><CategoryEditModalHeader isEdit={true} /><div className='modal-body scroll-y mx-5 mx-xl-15 my-7'><CategoryEditModalForm isCategoryLoading={isLoading} category={category} /> </div></>
  }

  return null
}

export {CategoryEditModalFormWrapper}
