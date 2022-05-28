import'./uploadForm.css'

const Uploadform = (props) =>{
return(
    <div className="wrapper" >
      <header>File Uploader</header>
        <form onSubmit={props.handleSubmit}>
            <div className="selectField">
              <i className="fa-solid fa-cloud-arrow-up fa-2xl"></i>
              <input className="select" type="file" onClick={props.reset} onChange={props.handleFileSelect} />
            </div>
            {props.selectedFile && !props.error &&(
            <input className="uploadButton" type="submit" value="Upload File" />
            )}
            {(props.error &&
               <span style={{marginTop: '15px', color: 'red'}}>{props.error}</span> 
            )}
        </form>
      </div>

)}
export default Uploadform; 
