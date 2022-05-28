import React, { useState } from 'react';
import axios from 'axios';
import ColumnPlot from './ColumnPlot';
import 'bootstrap/dist/css/bootstrap.min.css'
import PieChartBasic from './PieChartBasic';
import PieChartAction from './PieChartAction';
import Uploadform from './upload/UploadForm';


const Upload = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res)=> {
        setData(res.data)
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    const extension = event.target.files[0].type
    if(extension !== 'text/csv'){
      setError('Invalid file type')
    }
  }
 
  const reset = () => {
    setSelectedFile(null)
    setError(null)
  } 
  
  const cleanData = () =>{
    setData(null)
  }

  return (
    <>
    {!data &&
    (
      <Uploadform handleSubmit={handleSubmit} handleFileSelect={handleFileSelect} selectedFile={selectedFile} error={error} reset={reset}/>
    )}
    { data &&
    (
    <div className='container'>
      <button type="button" class="btn btn-secondary" style={{marginBottom: "10px"}} onClick={cleanData}>Clean</button>
      <div className="p-3 border bg-light"><ColumnPlot data={data[0]}/></div>
        <div className="row gx-6 mt-4">
          <div className="col-6">
            <div className="p-3 border bg-light"><PieChartBasic data={data[1]} option='category'/></div>
          </div>
          <div className="col-6">
            <div className="p-3 border bg-light"><PieChartAction data={data[1]} option='lot_condition'/></div>
          </div>
        </div>
      </div>
      )
      }
    </>
  )
};

export default Upload;