import React, { useState, createContext, useContext } from 'react';
import { Document, Page } from 'react-pdf';

import projectsdat from './projects_data.json'
import './App.css';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


let projects = projectsdat.data;

function ProjectPDF(props) {
    let currentProject = projects[props.projectIndex]

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }
    
    let mediaWrapper = {
        // background: 'black',
        height : currentProject.pdf[1],
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : '20px',
        paddingBottom : '20px',
        background : "#eee"
    }
    
    
    if(currentProject.pdf[0] === ""){
        return(<div></div>)
    }else{
        return (
            <div style={mediaWrapper}>
                <div>
                    <Document file={currentProject.pdf[0]}  
                        onLoadSuccess={onDocumentLoadSuccess}
                        onSourceSuccess={()=>{setPageNumber(1)}}
                        options={{
                            cMapUrl: '/cmaps/',
                            standardFontDataUrl: '/standard_fonts/',
                        }}>
                        <Page 
                            width={540}
                            pageNumber={pageNumber} />
                    </Document>
                </div>
                
                <div className='page-controls'>
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        >
                        {"<"}
                    </button>
                    <span> {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} </span>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        >
                        {">"}
                    </button>
                </div>   
            </div>
          );
    } 
    
  }

function ProjectImage(props){
    let currentProject = projects[props.projectIndex]

    let imageStyle = {}

    if(props.mobile === 'true'){
        imageStyle = {
            width : '350px',
            height : 'auto',
            marginTop : '20px'
        }
    }else{
        imageStyle = {
            width : '500px',
            height : 'auto',
            marginTop : '20px'
        }
    }

    let mediaWrapper = {
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : '20px',
        paddingBottom : '20px'
    }
    console.log(currentProject)
    if(currentProject.img[0] === ""){
        return(<div></div>)
    }else{
        return(
            <div style={mediaWrapper}>
                {
                currentProject.img.map(function(img, index){
                  return(
                    <img className="" style={imageStyle} alt="" src={img} />
                  )
                  })
                }
            </div>
        )
    } 
}

function Video(props){
    let ctx = useContext(ProjectContext)
    let currentProject = projects[props.projectIndex]

    console.log("video : " + currentProject.vid[props.index])

    let videoSrc = currentProject.vid[props.index]

    let videoStyle = {}

    if(props.mobile === 'true'){
        videoStyle = {
            width : '350px',
            height : 'auto',
            marginTop : '20px'
        }
    }else{
        videoStyle = {
            width : '550px',
            height : 'auto',
            marginTop : '20px'
        }
    }

    return(
        <video
        key={props.projectIndex}
        loop={true}
        muted={true}
        playsInline={true}
        autoPlay={true}
        style={videoStyle}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    )
}

function ProjectVideo(props){
    let ctx = useContext(ProjectContext)
    let currentProject = projects[props.projectIndex]

    console.log(currentProject)

    let videoStyle = {
        width : '550px',
        height : 'auto',
        marginTop : '20px'
    }

    let mediaWrapper = {
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : '20px',
        paddingBottom : '20px'
    }


    if(currentProject.vid[0] === ""){
        return(
            <div></div>
        )
    }else{
        return(
            <div style={mediaWrapper}>
                {
                currentProject.vid.map(function(vid, index){
                  return(
                    <Video mobile = {props.mobile} index={index} projectIndex = {props.projectIndex}/>
                  )
                  })
                }
            </div>
        )
    }
}

function Youtube(props){
    let currentProject = projects[props.projectIndex]

    let mediaWrapper = {
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : '20px',
        paddingBottom : '20px'
    }

    let youtubeStyle = {
        marginTop : '10px'
    }

    if(currentProject.youtube[0] === ""){
        return(
            <div></div>
        )
    }else{
        return(
            <div style={mediaWrapper}>
                {
                currentProject.youtube.map(function(vid, index){
                  return(
                    <iframe
                    style={youtubeStyle} 
                    width="550" 
                    height="315" 
                    src={vid} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                    </iframe>
                  )
                  })
                }
            </div>
        )
    }
}

let ProjectContext = createContext({
    stat:'', 
    setStat:()=>{}
  });

function ProjectInfo(props){

    let wrapperStyle = {
        opacity : '0',
        transition: 'opacity 0.5s ease-in-out'
    }
    let textStyle = {
        paddingLeft : '10px',
        paddingRight : '10px',
        marginTop : '10px',
        marginBottom : '0px',
        fontSize : '17px',
        wordBreak : 'keep-all'
    }

    let textStyle_small = {
        paddingLeft : '10px',
        paddingRight : '10px',
        marginTop : '15px',
        marginBottom : '0px',
        fontSize : '14px',
        wordBreak : 'keep-all'
    }

    let [classStat, setClass] = useState('');

    function showClass(){
        setClass('show')
    }

    let [projectState, setProject] = useState(props.projectIndex)
    let currentProject = projects[props.projectIndex]


    return(
        <ProjectContext.Provider value={{stat:projectState, setStat:setProject}} >
            <div>
                <p style={textStyle}>{currentProject.title}</p>
                <p style={textStyle}>{currentProject.year}</p>{
                    currentProject.status != "music" && <p style={textStyle}>{currentProject.scope}</p>
                }
                <p style={textStyle_small}>{currentProject.mainDescriptionEN}</p>
                <p style={textStyle_small}>{currentProject.mainDescriptionKR}</p>
                <p style={textStyle_small}>{currentProject.subDescription}</p>
                <a href={currentProject.link[0]} target='_blank' rel='noreferrer' style={textStyle_small} className='link'>{currentProject.link[1]}</a>

                <Youtube projectIndex = {props.projectIndex} />
                <ProjectPDF mobile = {props.mobile} projectIndex = {props.projectIndex}/>
                <ProjectImage mobile = {props.mobile} style={wrapperStyle} projectIndex = {props.projectIndex} className={classStat} onLoadedData={showClass}/>
                {
                   currentProject.status === "music" && 
                    (<>
                        <br />
                        <p style={{...textStyle_small, textAlign:"center", marginTop : '0px'}}>{currentProject.linkCenter[1]}</p><p href={currentProject.linkCenter[0]} target='_blank' rel='noreferrer' style={{...textStyle_small, textAlign:"center", marginTop : '0px'}} className='link'>{"Link"}</p>
                    </>
                    )
                }
               
                {
                    //for music
                    currentProject.status === "music" && currentProject.listCenter.map(function(list, index){
                        return(
                            <>
                                <p style={{...textStyle_small, textAlign:"center", marginTop : '0px'}}>{list}</p>
                                <br/>
                            </>
                        )})
                }
                <br/>
                
            </div>
        </ProjectContext.Provider>
        
    )
}

export default ProjectInfo;