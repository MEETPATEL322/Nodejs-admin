/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {ResetPassword} from '../core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
//import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'

const initialValues = {
  newpassword: '',
  confirmpassword: '',
}

const resetpasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmpassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function ResetPasswords() {
  var {id, token} = useParams()
  let navigate = useNavigate()
  // console.log("check id",id);
  // const params = new URLSearchParams(window.location.pathname);
  // console.log("checking",params.get('id'));

  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: resetpasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await ResetPassword(
          values.newpassword,
          values.confirmpassword,
          id,
          token
        )
        if (auth?.status === 'failed') {
          setStatus(auth.message)
          setTimeout(() => {
            if (auth.message == 'Your session has been Expired!') {
              navigate('/', {replace: true})
            }
          }, 3000)
        } else {
          saveAuth(auth)
          navigate('/', {replace: true})
        }

        // const {data: user} = await getUserByToken(auth.token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        //setStatus('Password hase been updated..')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

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

      {/* begin::Form group Firstname */}

      {/* end::Form group */}

      {/* begin::Form group Email */}

      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>New Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('newpassword')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.newpassword && formik.errors.newpassword,
                },
                {
                  'is-valid': formik.touched.newpassword && !formik.errors.newpassword,
                }
              )}
            />
            {formik.touched.newpassword && formik.errors.newpassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert' style={{color: '#f1416c'}}>
                    {formik.errors.newpassword}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('confirmpassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.confirmpassword && formik.errors.confirmpassword,
            },
            {
              'is-valid': formik.touched.confirmpassword && !formik.errors.confirmpassword,
            }
          )}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' style={{color: '#f1416c'}}>
                {formik.errors.confirmpassword}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}

      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={
            formik.isSubmitting ||
            !formik.isValid ||
            !formik.touched.confirmpassword ||
            !formik.touched.newpassword
          }
        >
          {<span className='indicator-label'>Submit</span>}
        </button>
      </div>
      {/* end::Form group */}
    </form>
  )
}
