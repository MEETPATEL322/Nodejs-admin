import {Column} from 'react-table'
import {NewsInfoCell} from './NewsInfoCell'
import {NewsDataCell} from './NewsDataCell'
import {NewsActionsCell} from './NewsActionsCell'
import {NewsSelectionCell} from './NewsSelectionCell'
import {NewsCustomHeader} from './NewsCustomHeader'
import {NewsSelectionHeader} from './NewsSelectionHeader'
import {News} from '../../core/_models'

const newsColumns: ReadonlyArray<Column<News>> = [
  {
    Header: (props) => <NewsSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <NewsSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => (
      <NewsCustomHeader tableProps={props} title='Image' className='min-w-125px' />
    ),
    id: 'newsimage',
    Cell: ({...props}) => <NewsInfoCell image={props.data[props.row.index].newsimage} title={props.data[props.row.index].newstitle} />,
  },
  {
    Header: (props) => (
      <NewsCustomHeader tableProps={props} title='Title' className='min-w-125px' />
    ),
    id: 'newstitle',
    Cell: ({...props}) => <NewsDataCell data={props.data[props.row.index].newstitle} />,
  },
  {
    Header: (props) => (
      <NewsCustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'newsdescription',
    Cell: ({...props}) => <NewsDataCell data={props.data[props.row.index].newsdescription} />,
  },
  {
    Header: (props) => (
      <NewsCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <NewsActionsCell id={props.data[props.row.index]._id} />,
  },
]

export {newsColumns}
