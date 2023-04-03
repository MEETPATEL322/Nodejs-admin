import {useEffect} from 'react'
import {QratedContentEditModalHeader} from './QratedContentEditModalHeader'
import {QratedContentEditModalFormWrapper} from './QratedContentEditModalFormWrapper'

const QratedContentEditModal = () => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_qrated_content'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            {/* <QratedContentEditModalHeader /> */}
            {/* begin::Modal body */}
            {/* <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'> */}
              <QratedContentEditModalFormWrapper />
            {/* </div> */}
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}

export {QratedContentEditModal}
