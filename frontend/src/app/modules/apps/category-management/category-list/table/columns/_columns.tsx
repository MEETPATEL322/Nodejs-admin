import {Column} from 'react-table'
import {CategoryDataCell} from './CategoryDataCell'
import {CategoryActionsCell} from './CategoryActionsCell'
import {CategorySelectionCell} from './CategorySelectionCell'
import {CategoryCustomHeader} from './CategoryCustomHeader'
import {CategorySelectionHeader} from './CategorySelectionHeader'
import {CategoryIsActiveCell} from './CategoryIsActiveCell'
import {Category} from '../../core/_models'

const categoryColumns: ReadonlyArray<Column<Category>> = [
  {
    Header: (props) => <CategorySelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CategorySelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => (
      <CategoryCustomHeader tableProps={props} title='Name' className='min-w-125px' />
    ),
    id: 'name',
    Cell: ({...props}) => <CategoryDataCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <CategoryCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'isActive',
    Cell: ({...props}) => <CategoryIsActiveCell is_active={props.data[props.row.index].isActive} />,
  },
  {
    Header: (props) => (
      <CategoryCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CategoryActionsCell id={props.data[props.row.index]._id} />,
  },
]

export {categoryColumns}
