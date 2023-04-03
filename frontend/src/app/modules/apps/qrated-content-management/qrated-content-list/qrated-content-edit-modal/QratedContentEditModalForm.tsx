import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {initialQratedContent, QratedContent} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {QratedContentListLoading} from '../components/loading/QratedContentListLoading'
import {createQratedContent, updateQratedContent} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';
const API_URL = "http://localhost:5000/api";
const UPLOAD_ENDPOINT = "addeditorimagequrated";

type Props = {
  isQratedContentLoading: boolean
  qratedContent: QratedContent
}

const editQratedContentSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('Title is required'),
  description: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(5000, 'Maximum 5000 symbols')
    .required('Description is required'),
  image: Yup.string().required('Image is required'),
})

const QratedContentEditModalForm: FC<Props> = ({qratedContent, isQratedContentLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [image, setImage] = useState<any>()

  const [qratedContentForEdit] = useState<QratedContent>({
    ...qratedContent,
    title: qratedContent.title || initialQratedContent.title,
    description: qratedContent.description || initialQratedContent.description,
    image: qratedContent.image || initialQratedContent.image
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: qratedContentForEdit,
    validationSchema: editQratedContentSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
     
      try {
        if (isNotEmpty(values._id)) {
          console.log("values==", values, qratedContentForEdit)
          const formData = new FormData()

          formData.append('_id', values._id?? '')
          formData.append('title', values.title?? '')
          if(qratedContentForEdit.image !== values.image) {
            console.log("in if====")
            formData.append('image', image)
          }else {
            console.log("in else====")
          }
          formData.append('description', values.description ?? '')
          console.log("Form Data ===",formData)
          await updateQratedContent(formData, values._id?? '').then((res)=> {
            toast.success("Curated Content updated successfully!")
          })
        } else {
          const formData = new FormData()
          formData.append('title', values.title?? '')
          formData.append('image', image)
          // formData.append('filename', image.name+"-" + Date.now()+".jpg")
          formData.append('description', values.description ?? '')
          // formData.fileData = image;
          // values.filename = image.name;
          console.log("Values: ", formData);
          await createQratedContent(formData).then((res)=> {
            toast.success("Curated Content added successfully!")
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
    formik.setFieldValue("description", editor.getData());
};

function uploadAdapter(loader:any) {
  
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        console.log(loader.file);
        loader.file.then((file:any) => {
          body.append("image", file);
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
      <form id='kt_modal_add_qrated-content_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_qrated-content_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_qrated-content_header'
          data-kt-scroll-wrappers='#kt_modal_add_qrated-content_scroll'
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
              {...formik.getFieldProps('title')}
              type='text'
              name='title'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.title && formik.errors.title},
                {
                  'is-valid': formik.touched.title && !formik.errors.title,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isQratedContentLoading}
            />
            {formik.touched.title && formik.errors.title && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.title}</span>
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
              data={qratedContentForEdit && qratedContentForEdit.description}
              // {...formik.getFieldProps('cmsDescription')}
              // className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              disabled={formik.isSubmitting || isQratedContentLoading}
              onChange={inputHandler}
            />

            {/* <CKEditor
              config={{removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']}}
              editor={ ClassicEditor }
              data={qratedContentForEdit && qratedContentForEdit.description}
              // {...formik.getFieldProps('cmsDescription')}
              // className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              disabled={formik.isSubmitting || isQratedContentLoading}
              onChange={inputHandler}
            /> */}
            {/* <input
              placeholder='Description'
              {...formik.getFieldProps('description')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.description && formik.errors.description},
                {
                  'is-valid': formik.touched.description && !formik.errors.description,
                }
              )}
              type='text'
              name='description'
              autoComplete='off'
              disabled={formik.isSubmitting || isQratedContentLoading}
            /> */}
            {/* end::Input */}
            {formik.touched.description && formik.errors.description && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.description}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Image</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              // placeholder='Image'
              // {...formik.getFieldProps('image')}
              onChange={(e: any) => {setImage(e.target.files[0]);formik.handleChange(e);}}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.image && formik.errors.image},
                {
                  'is-valid': formik.touched.image && !formik.errors.image,
                }
              )}
              type='file'
              name='image'
              autoComplete='off'
              disabled={formik.isSubmitting || isQratedContentLoading}
            />
            {/* end::Input */}
            {formik.touched.image && formik.errors.image && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.image}</span>
              </div>
            )}
            {console.log("qratedContentForEdit=====", qratedContentForEdit)}
            {
              qratedContentForEdit && qratedContentForEdit._id &&
            <img className='h-100px mt-10 w-100px' src={(`${process.env.REACT_APP_API_URL}/${qratedContentForEdit.image}`)} alt={qratedContentForEdit._id}/>
            }
          </div>
          {/* end::Input group */}

          
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-qrated-content-modal-action='cancel'
            disabled={formik.isSubmitting || isQratedContentLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-qrated-content-modal-action='submit'
            disabled={isQratedContentLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isQratedContentLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isQratedContentLoading) && <QratedContentListLoading />}
    </>
  )
}

export {QratedContentEditModalForm}
