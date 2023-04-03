/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Router, useParams} from 'react-router-dom'
import {IUpdatePassword, IUpdateEmail, updatePassword, updateEmail} from '../SettingsModel'
import{ChangePassword} from '../_requests_account_settings'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Current Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('New Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password Confirmation is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const SignInMethod: React.FC = () => {
  
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

  const [loading2, setLoading2] = useState(false)
  var { id } = useParams()
  const userId = JSON.parse(localStorage.getItem('kt-auth-react-v')!)
  const success = () => {toast.success('Password Updated Successfully!')}
  //const failed = () => {toast.error(data.message)}

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values,{setStatus, resetForm, setSubmitting},) => {
      setLoading2(true)
      try {
        const {data} = await ChangePassword(
          values.currentPassword,
          values.newPassword,
          values.passwordConfirmation,
          userId?.id
        )
        resetForm()
        if(data?.status === 'failed'){
          setStatus(data.message)
          setLoading2(false)
          setPasswordForm(false)
          setSubmitting(false)    
          const failed = () => {toast.error(data.message)}
          failed()
         }else{
          setPasswordUpdateData(values)
            setLoading2(false)
            setPasswordForm(false)
            setSubmitting(false)    
            success()
         }
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setLoading2(false)
      }
    },
  })

  return (
    
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Change Password</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          
          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Password</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                onReset={formik2.handleReset}
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Current Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                        // <div className='fv-plugins-message-container'>
                        //   <div className='fv-help-block'>{formik2.errors.currentPassword}</div>
                        // </div>
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' style={{ color: '#f1416c' }}>{formik2.errors.currentPassword}</span>
                        </div>
                      </div>
                        
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                        New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='newpassword'
                        //name='New Password'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                       <div className='fv-plugins-message-container'>
                       <div className='fv-help-block'>
                         <span role='alert' style={{ color: '#f1416c' }}>{formik2.errors.newPassword }</span>
                       </div>
                     </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' style={{ color: '#f1416c' }}>{formik2.errors.passwordConfirmation}</span>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Update Password'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  
                  <button
                  type='reset'
                  className='btn btn-lg btn-light-primary fw-bolder'
                    onClick={() => {
                      setLoading2(false)
                      setPasswordForm(false)
                    }}
                    >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true) 
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
            <KTSVG
              path='/media/icons/duotune/general/gen048.svg'
              className='svg-icon-2tx svg-icon-primary me-4'
            />
            <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
              <div className='mb-3 mb-md-0 fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Secure Your Account</h4>
                <div className='fs-6 text-gray-600 pe-7'>
                  Two-factor authentication adds an extra layer of security to your account. To log
                  in, in addition you'll need to provide a 6 digit code
                </div>
              </div>
              <a
                href='#'
                className='btn btn-primary px-6 align-self-center text-nowrap'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_two_factor_authentication'
              >
                Enable
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}

