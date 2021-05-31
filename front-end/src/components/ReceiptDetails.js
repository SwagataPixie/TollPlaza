import React from 'react'
import PropTypes from 'prop-types'

const ReceiptDetails = props => {
  if (props.receipts.length === 0 ) {
    return <h1>No Valid Receipts</h1>
  } else {
    return (
      <div>
        {props.receipts.map(receipt => {
          return (
            <div key={receipt.id}>{receipt.createdOn}</div>
          )
        })}
      </div>
    )
  }
}

ReceiptDetails.propTypes = {

}

export default ReceiptDetails
