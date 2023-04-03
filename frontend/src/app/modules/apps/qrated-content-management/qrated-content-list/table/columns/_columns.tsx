import {Column} from 'react-table'
import {QratedContentInfoCell} from './QratedContentInfoCell'
import {QratedContentDataCell} from './QratedContentDataCell'
import {QratedContentActionsCell} from './QratedContentActionsCell'
import {QratedContentSelectionCell} from './QratedContentSelectionCell'
import {QratedContentCustomHeader} from './QratedContentCustomHeader'
import {QratedContentSelectionHeader} from './QratedContentSelectionHeader'
import {QratedContent} from '../../core/_models'

const qratedContentColumns: ReadonlyArray<Column<QratedContent>> = [
  {
    Header: (props) => <QratedContentSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <QratedContentSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => (
      <QratedContentCustomHeader tableProps={props} title='Image' className='min-w-125px' />
    ),
    id: 'image',
    Cell: ({...props}) => <QratedContentInfoCell image={props.data[props.row.index].image} title={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => (
      <QratedContentCustomHeader tableProps={props} title='Title' className='min-w-125px' />
    ),
    id: 'title',
    Cell: ({...props}) => <QratedContentDataCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => (
      <QratedContentCustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'description',
    Cell: ({...props}) => <QratedContentDataCell data={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => (
      <QratedContentCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <QratedContentActionsCell id={props.data[props.row.index]._id} />,
  },
]

export {qratedContentColumns}
