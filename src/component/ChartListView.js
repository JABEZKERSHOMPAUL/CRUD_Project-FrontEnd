import React from 'react'
import { useParams } from 'react-router-dom'

function ChartListView() {
    const params =useParams()
    console.log(params.chartId)
  return (
    <div>ChartListView</div>
  )
}

export default ChartListView