import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const createnewsSchema = Yup.object().shape({
  newstitle: Yup.string()
    .required('Title is required'),
  newsdescription: Yup.string()
    .required('Description is required'),
  newsimage: Yup.string().default('')
    //.required('Please choose a required file'),
})

export function NewsUpdate() {
  const [loading, setLoading] = useState(false)
  const [newstitle, setNewstitle] = useState<any>()
  const [image, setimage] = useState<any>()
  const [newsdescription, setnewsdescription] = useState<any>()
  const [id, setid] = useState<any>('');
  
useEffect(() => {
    setid(localStorage.getItem('ID'));
    setNewstitle(localStorage.getItem('newstitle'));
    console.log(localStorage.getItem('newstitle'));
    setimage(localStorage.getItem('image'));
    setnewsdescription(localStorage.getItem('newsdescription'));
}, [])
  let navigate = useNavigate();
  //const [newsimage, setimage] = useState<any>()
  //const formData = new FormData()
  //formData.append('filename', newsimage.name)
  const formik = useFormik({
    initialValues : {
      newstitle: localStorage.getItem('newstitle'),
      newsdescription: localStorage.getItem('newsdescription'),
      newsimage: '',
    },
    validationSchema: createnewsSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
        const formData = new FormData()
        formData.append('newstitle', newstitle)
        if(image){
          formData.append('newsimage', image)
          formData.append('filename', image.name)
        }
        formData.append('newsdescription', newsdescription)
        console.log('hii',formData)
      //const imgArr =values.newsimage?.split("\\");
      //console.log(imgArr);
      //values.newsimage = imgArr[imgArr?.length-1]
      //const newdata = values.newsimage;
      try {
        axios.put(`${process.env.REACT_APP_API_URL}/news/${id}`, formData).then((res) => {
          alert('data inserted.')
          // setData(res.data)
          navigate("/crafted/news/list", { replace: true })
        })
        // console.log('hii',newsimage)
      } catch (error) {
        console.error(error)
        setStatus('')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })
  
  return (
    <form
    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id='kt_login_signup_form'
    onSubmit={formik.handleSubmit}
  >
    {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
    )}

    {/* begin::Form group newstitle */}
        <div className='row fv-row mb-7'>
        <div className='col-xl-6 mx-auto'>
          <label className='class="form-label fw-bolder text-dark fs-6'>News Title*</label>
          <input
            placeholder='News Title'
            type='text'
            autoComplete='off'
            defaultValue={newstitle}
            {...formik.getFieldProps('newstitle')}
            onChange={(e) => {setNewstitle(e.target.value);
              formik.handleChange(e);}}
            name ='newstitle'
            //value={newstitle}
            className={clsx(
              'form-control form-control-lg form-control-solid bg-secondary',
              {
                'is-invalid': formik.touched.newstitle && formik.errors.newstitle,
              },
              {
                'is-valid': formik.touched.newstitle && !formik.errors.newstitle,
              }
            )}
          />
          {formik.touched.newstitle && formik.errors.newstitle && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.newstitle}</span>
              </div>
            </div>
          )}
        </div>
      </div>
  {/* End::Form group newstitle */}

  {/* begin::Form group newsdescription */}
  <div className='row fv-row mb-7'>
        <div className='col-xl-6 mx-auto'>
          <label className='class="form-label fw-bolder text-dark fs-6'>News Description*</label>
          <textarea
            placeholder='News Description'
            autoComplete='off'
            defaultValue={newsdescription}
            {...formik.getFieldProps('newsdescription')}
            onChange={(e) => {setnewsdescription(e.target.value);
              formik.handleChange(e);}}
              name='newsdescription'
              //value={newsdescription}
            className={clsx(
              'form-control form-control-lg form-control-solid bg-secondary',
              {
                'is-invalid': formik.touched.newsdescription && formik.errors.newsdescription,
              },
              {
                'is-valid': formik.touched.newsdescription && !formik.errors.newsdescription,
              }
            )}
          />
          {formik.touched.newsdescription && formik.errors.newsdescription && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.newsdescription}</span>
              </div>
            </div>
          )}
        </div>
      </div>
  {/* End::Form group newsdescription */}

  {/* begin::Form group newsimage */}
    <div className='row fv-row mb-7'>
        <div className='col-xl-6 mx-auto'>
          <label className='class="form-label fw-bolder text-dark fs-6'>News Image*</label>
          <input
            placeholder='Select a Image file for a input'
            type='file'
            autoComplete='off'
            defaultValue={newsdescription}
            {...formik.getFieldProps('newsimage')}
            onChange={(e: any) => {setimage(e.target.files[0]);formik.handleChange(e);}}
            name='newsimage'
            className={clsx(
              'form-control form-control-lg form-control-solid bg-secondary',
              {
                'is-invalid': formik.touched.newsimage && formik.errors.newsimage,
              },
              {
                'is-valid': formik.touched.newsimage && !formik.errors.newsimage,
              }
            )}
          />
          {formik.touched.newsimage && formik.errors.newsimage && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.newsimage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
  {/* End::Form group newsimage */}

  {/* begin::Form group */}
  <div className='col-xl-6 mx-auto'>
        <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      </div>
  {/* end::Form group */}
    
  </form>
  )
}
