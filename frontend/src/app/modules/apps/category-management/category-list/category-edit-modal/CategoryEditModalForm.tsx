import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {initialCategory, Category} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {CategoryListLoading} from '../components/loading/CategoryListLoading'
import {updateCategory} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  isCategoryLoading: boolean
  category: Category
}

const editCategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  isActive: Yup.boolean()
    .required('Status is required')
})

const CategoryEditModalForm: FC<Props> = ({category, isCategoryLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [categoryForEdit] = useState<Category>({
    ...category,
    // avatar: category.avatar || initialcategory.avatar,
    // role: category.role || initialcategory.role,
    // position: category.position || initialcategory.position,
    name: category.name || initialCategory.name,
    isActive: category.isActive,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: categoryForEdit,
    validationSchema: editCategorySchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)     
      try {
        if (isNotEmpty(values._id)) {
          await updateCategory(values).then((res)=> {
            toast.success("Category updated successfully!")
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

  return (
    <>
      <form id='kt_modal_add_category_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_category_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_category_header'
          data-kt-scroll-wrappers='#kt_modal_add_category_scroll'
          data-kt-scroll-offset='300px'
        >
         

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Name</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.name && formik.errors.name},
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete='off'
              disabled={true}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Status</label>
            {/* end::Label */}

            {/* begin::Input */}
            <select className="form-select" aria-label="Select status"   {...formik.getFieldProps('isActive')}>
              <option value={'true'} >Active</option>
              <option value={'false'} >In Active</option>
            </select>
            {/* <input
              placeholder='Description'
              {...formik.getFieldProps('isActive')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.isActive && formik.errors.isActive},
                {
                  'is-valid': formik.touched.isActive && !formik.errors.isActive,
                }
              )}
              type='text'
              name='isActive'
              autoComplete='off'
              disabled={formik.isSubmitting || isCategoryLoading}
            /> */}
            {/* end::Input */}
            {formik.touched.isActive && formik.errors.isActive && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.isActive}</span>
              </div>
            )}
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
            data-kt-category-modal-action='cancel'
            disabled={formik.isSubmitting || isCategoryLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-category-modal-action='submit'
            disabled={isCategoryLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isCategoryLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isCategoryLoading) && <CategoryListLoading />}
    </>
  )
}

export {CategoryEditModalForm}
