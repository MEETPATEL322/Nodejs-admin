import {Column} from 'react-table'
import { Cms } from '../../core/_models'
import { CmsActionsCell } from './CmsActionsCell'
import { CmsCustomHeader } from './CmsCustomHeader'
import { CmsDataCell } from './CmsDataCell'
import { CmsIsActiveCell } from './CmsIsActiveCell'
import { CmsSelectionCell } from './CmsSelectionCell'
import { CmsSelectionHeader } from './CmsSelectionHeader'

const cmsColumns: ReadonlyArray<Column<Cms>> = [
  {
    Header: (props) => <CmsSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <CmsSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => (
      <CmsCustomHeader tableProps={props} title='Title' className='min-w-125px' />
    ),
    id: 'cmsTitle',
    Cell: ({...props}) => <CmsDataCell data={props.data[props.row.index].cmsTitle} />,
  },
  {
    Header: (props) => (
      <CmsCustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'cmsDescription',
    Cell: ({...props}) => <CmsDataCell data={props.data[props.row.index].cmsDescription} />,
  },
  {
    Header: (props) => (
      <CmsCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'cmsStatus',
    Cell: ({...props}) => <CmsIsActiveCell is_active={props.data[props.row.index].cmsStatus} />,
  },
  {
    Header: (props) => (
      <CmsCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CmsActionsCell id={props.data[props.row.index]._id} />,
  },
]

export {cmsColumns}
