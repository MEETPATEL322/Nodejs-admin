import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {qratedContentColumns} from './columns/_columns'
import {QratedContent} from '../core/_models'
import {QratedContentListLoading} from '../components/loading/QratedContentListLoading'
import {QratedContentListPagination} from '../components/pagination/QratedContentListPagination'
import {KTCardBody} from '../../../../../../_metronic/helpers'

const QratedContentTable = () => {
  const qratedContent = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => qratedContent, [qratedContent])
  const columns = useMemo(() => qratedContentColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_qrated_content'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<QratedContent>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<QratedContent>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <QratedContentListPagination />
      {isLoading && <QratedContentListLoading />}
    </KTCardBody>
  )
}

export {QratedContentTable}
