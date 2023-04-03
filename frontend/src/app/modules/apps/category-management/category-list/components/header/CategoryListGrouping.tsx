import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {updateSelectedCategory} from '../../core/_requests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const activateSelectedItems = useMutation(() => updateSelectedCategory(selected, 'true'), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.CATEGORY_LIST}-${query}`])
      toast.success("Category updated successfully!")
      clearSelected()
    },
  })
  const deactivateSelectedItems = useMutation(() => updateSelectedCategory(selected, 'false'), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.CATEGORY_LIST}-${query}`])
      toast.success("Category updated successfully!")
      clearSelected()
    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-success me-3'
        onClick={async () => await activateSelectedItems.mutateAsync()}
      >
       Activate
      </button>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deactivateSelectedItems.mutateAsync()}
      >
       DeActivate
      </button>
    </div>
  )
}

export {CategoryListGrouping}
