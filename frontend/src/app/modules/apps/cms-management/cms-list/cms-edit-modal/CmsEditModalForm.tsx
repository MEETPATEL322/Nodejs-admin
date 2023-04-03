import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Cms, initialCms} from '../core/_models'
import {createCms, updateCms} from '../core/_requests'
import {CmsListLoading} from '../components/loading/CmsListLoading'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const API_URL = "http://localhost:5000/";
const UPLOAD_ENDPOINT = "addeditorimagecms";

type Props = {
  isCmsLoading: boolean
  cms: Cms
}

const editCmsSchema = Yup.object().shape({
  cmsTitle: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Title is required'),
  cmsDescription: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .required('Description is required'),
  newsimage: Yup.string(),
})

const CmsEditModalForm: FC<Props> = ({cms, isCmsLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [image, setImage] = useState<any>()

  const [cmsForEdit] = useState<Cms>({
    ...cms,
    cmsTitle: cms.cmsTitle || initialCms.cmsTitle,
    cmsDescription: cms.cmsDescription || initialCms.cmsDescription,
    cmsStatus: cms.cmsStatus || initialCms.cmsStatus,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    initialValues: cmsForEdit,
    validationSchema: editCmsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      let formData = values

      try {
        if (isNotEmpty(values._id)) {
          await updateCms(values).then((res) => {
            toast.success('Cms updated successfully!')
          })
        } else {          
          await createCms(values).then((res) => {
            toast.success('Cms added successfully!')
          })
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const inputHandler = (event: any, editor: any) => {
    formik.setFieldValue("cmsDescription", editor.getData());
};
function uploadAdapter(loader:any) {
  
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        console.log(loader.file);
        loader.file.then((file:any) => {
          body.append("cmsimage", file);
          fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            method: "post",
             body: body
            // mode: "no-cors"
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({
                default: `http://localhost:5000/${res.filename}`
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    }
  };
}
function uploadPlugin(editor:any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
    return uploadAdapter(loader);
  };
}
  return (
    <>
      <form id='kt_modal_add_cms_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_cms_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_cms_header'
          data-kt-scroll-wrappers='#kt_modal_add_cms_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Title</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Title'
              {...formik.getFieldProps('cmsTitle')}
              type='text'
              name='cmsTitle'
              className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              autoComplete='off'
              disabled={formik.isSubmitting || isCmsLoading}
            />
            {formik.touched.cmsTitle && formik.errors.cmsTitle && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.cmsTitle}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Description</label>
            {/* end::Label */}

            {/* begin::Input */}
            <CKEditor
            config={{
              extraPlugins: [uploadPlugin]
              }}
              // config={{removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']}}
              editor={ ClassicEditor }
              data={cmsForEdit && cmsForEdit.cmsDescription}
              // {...formik.getFieldProps('cmsDescription')}
              // className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              disabled={formik.isSubmitting || isCmsLoading}
              onChange={inputHandler}
            />
            {/* <input
              placeholder='Description'
              
              type='text'
              name='cmsDescription'
              autoComplete='off'
              
            /> */}
            {/* end::Input */}
            {formik.touched.cmsDescription && formik.errors.cmsDescription && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.cmsDescription}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          {/* begin::Input group */}

          {/* CmsStatus */}
       

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Status</label>
            {/* end::Label */}

            {/* begin::Input */}
            
            <select className="form-select" aria-label="Select status"   {...formik.getFieldProps('cmsStatus')}>
              <option value={'true'} >Active</option>
              <option value={'false'} >In Active</option>
            </select>
            {/* end::Input */}
            {formik.touched.cmsStatus && formik.errors.cmsStatus && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.cmsStatus}</span>
              </div>
            )}
          </div>

          
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-cms-modal-action='cancel'
            disabled={formik.isSubmitting || isCmsLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-cms-modal-action='submit'
            disabled={isCmsLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isCmsLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isCmsLoading) && <CmsListLoading />}
    </>
  )
}

export {CmsEditModalForm}
