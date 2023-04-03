import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialNews, News} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {NewsListLoading} from '../components/loading/NewsListLoading'
import {createNews, updateNews} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';
const API_URL = "https://reelmartiniadmin.sapphiresolutions.in.net";
const UPLOAD_ENDPOINT = "addeditorimage";

type Props = {
  isNewsLoading: boolean
  news: News
}

const editNewsSchema = Yup.object().shape({
  newstitle: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('Title is required'),
  newsdescription: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(5000, 'Maximum 5000 symbols')
    .required('Description is required'),
  newsimage: Yup.string().required('Image is required'),
})

const NewsEditModalForm: FC<Props> = ({news, isNewsLoading}, {handleChange, ...props}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [image, setImage] = useState<any>()
  const [imageVal, setImageval] = useState<any>()
  const [newsForEdit] = useState<News>({
    ...news,
    // avatar: news.avatar || initialnews.avatar,
    // role: news.role || initialnews.role,
    // position: news.position || initialnews.position,
    newstitle: news.newstitle || initialNews.newstitle,
    newsdescription: news.newsdescription || initialNews.newsdescription,
    newsimage: news.newsimage || initialNews.newsimage
  })

  

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }
  const formik = useFormik({
    initialValues: newsForEdit,
    validationSchema: editNewsSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values._id)) {
          console.log("values==", values, newsForEdit)
          const formData = new FormData()

          formData.append('_id', values._id?? '')
          formData.append('newstitle', values.newstitle?? '')
          if(newsForEdit.newsimage !== values.newsimage) {
            console.log("in if====")
            formData.append('newsimage', image)
          }else {
            console.log("in else====")
          }
          formData.append('newsdescription', values.newsdescription ?? '')
          console.log("Form Data ===",formData)
          await updateNews(formData, values._id?? '').then((res)=> {
            toast.success("News updated successfully!")
          })
        } else {
          const formData = new FormData()
          formData.append('newstitle', values.newstitle?? '')
          formData.append('newsimage', image)
          // formData.append('filename', image.name+"-" + Date.now()+".jpg")
          formData.append('newsdescription', values.newsdescription ?? '')
          // formData.fileData = image;
          // values.filename = image.name;
          console.log("Values: ", formData);
          await createNews(formData).then((res)=> {
            toast.success("News added successfully!")
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
    formik.setFieldValue("newsdescription", editor.getData());
};

function uploadAdapter(loader:any) {
  
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        console.log(loader.file);
        loader.file.then((file:any) => {
          body.append("newsimage", file);
          fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            method: "post",
             body: body
            // mode: "no-cors"
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({
                default: `https://reelmartiniadmin.sapphiresolutions.in.net/${res.filename}`
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

      <form id='kt_modal_add_news_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_news_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_news_header'
          data-kt-scroll-wrappers='#kt_modal_add_news_scroll'
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
              {...formik.getFieldProps('newstitle')}
              type='text'
              name='newstitle'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.newstitle && formik.errors.newstitle},
                {
                  'is-valid': formik.touched.newstitle && !formik.errors.newstitle,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isNewsLoading}
            />
            {formik.touched.newstitle && formik.errors.newstitle && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.newstitle}</span>
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
              // config={{removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']}}
              config={{
              extraPlugins: [uploadPlugin]
              }}
              editor={ ClassicEditor }
              data={newsForEdit && newsForEdit.newsdescription}
              // {...formik.getFieldProps('cmsDescription')}
              // className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
              disabled={formik.isSubmitting || isNewsLoading}
              onChange={inputHandler}
            />
            {/* <input
              placeholder='Description'
              {...formik.getFieldProps('newsdescription')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.newsdescription && formik.errors.newsdescription},
                {
                  'is-valid': formik.touched.newsdescription && !formik.errors.newsdescription,
                }
              )}
              type='text'
              name='newsdescription'
              autoComplete='off'
              disabled={formik.isSubmitting || isNewsLoading}
            /> */}
            {/* end::Input */}
            {formik.touched.newsdescription && formik.errors.newsdescription && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.newsdescription}</span>
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
                {'is-invalid': formik.touched.newsimage && formik.errors.newsimage},
                {
                  'is-valid': formik.touched.newsimage && !formik.errors.newsimage,
                }
              )}
              type='file'
              name='newsimage'
              autoComplete='off'
              disabled={formik.isSubmitting || isNewsLoading}
            />
            {/* end::Input */}
            {formik.touched.newsimage && formik.errors.newsimage && (
              <div className='fv-plugins-message-container'>
                <span role='alert' style={{ color: '#f1416c' }}>{formik.errors.newsimage}</span>
              </div>
            )}
            {
              newsForEdit && newsForEdit._id &&
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img className='h-100px mt-10 w-100px' src={(`${process.env.REACT_APP_API_URL}/${newsForEdit.newsimage}`)} alt="image"/>
            
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
            data-kt-news-modal-action='cancel'
            disabled={formik.isSubmitting || isNewsLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-news-modal-action='submit'
            disabled={isNewsLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isNewsLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isNewsLoading) && <NewsListLoading />}
    </>
  )
}

export {NewsEditModalForm}