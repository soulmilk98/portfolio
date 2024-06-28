import React, { useState, useEffect, createContext, useContext } from 'react';
import { Document, Page } from 'react-pdf';
import { ref, onValue } from 'firebase/database';
import { database, storage } from './FirebasePortfolio'; // Adjust the import path according to your file structure
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

import './App.css';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

let ProjectContext = createContext({
    stat: '', 
    setStat: () => {}
});

function ProjectPDF(props) {
    
    let currentProject = props.project;

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
        height: currentProject.pdf[1],
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
        background: "#eee"
    };

    if (currentProject.pdf[0] === "") {
        return (<div></div>);
    } else {
        return (
          <>
            <div style={mediaWrapper}>
              
                <div>
                    
                    <Document file={`https://github.com/soulmilk98/portfolio/blob/main/build/compressed/${currentProject.pdf[0]}?raw=true`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onSourceSuccess={() => { setPageNumber(1) }}
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
            <p style={{ textAlign: "center", marginTop: '0px' }}>
              <a href={`https://github.com/soulmilk98/portfolio/blob/main/build/${currentProject.pdf[0]}?raw=true`} target='_blank' rel='noreferrer' className='link'>{"PDF Download Link"}</a>
            </p>
          </>
        );
    } 
}

function ProjectImage(props) {
    
    let currentProject = props.project;
  
    let imageStyle = {};

    if (props.mobile === 'true') {
        imageStyle = {
            width: '350px',
            height: 'auto',
            marginTop: '20px'
        };
    } else {
        imageStyle = {
            width: '500px',
            height: 'auto',
            marginTop: '20px'
        };
    }

    let mediaWrapper = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px'
    };

    if (currentProject.img[0] === "") {
        return (<div></div>);
    } else {
        return (
            <div style={mediaWrapper}>
                {
                currentProject.img.map(function(img, index){
                  return(
                    <img className="" style={imageStyle} alt="" src={`https://github.com/soulmilk98/portfolio/blob/main/build/${img}?raw=true`} />
                  )
                  })
                }
            </div>
        );
    }
}

function Youtube(props) {
    
    let currentProject = props.project;

    let mediaWrapper = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px'
    };

    let youtubeStyle = {
        marginTop: '10px'
    };

    if (currentProject.youtube[0] === "") {
        return (<div></div>);
    } else {
        return (
            <div style={mediaWrapper}>
                {
                currentProject.youtube.map(function (vid, index) {
                    return (
                    <iframe
                    key={index}
                    style={youtubeStyle}
                    width="550"
                    height="315"
                    src={vid}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    ></iframe>
                    );
                })
                }
            </div>
        );
    }
}

function ProjectInfo(props) {
    
    let wrapperStyle = {
        opacity: '0',
        transition: 'opacity 0.5s ease-in-out'
    };
    let textStyle = {
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '10px',
        marginBottom: '0px',
        fontSize: '17px',
        wordBreak: 'keep-all'
    };

    let textStyle_small = {
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '15px',
        marginBottom: '0px',
        fontSize: '14px',
        wordBreak: 'keep-all'
    };

    let [classStat, setClass] = useState('');

    function showClass() {
        setClass('show');
    }

   


    return (
        <ProjectContext.Provider value={ {project : props.project }} >
            <div>
                <p style={textStyle}>{props.project.title}</p>
                <p style={textStyle}>{props.project.year}</p>
                {
                    props.project.status !== "music" && <p style={textStyle}>{props.project.scope}</p>
                }
                <p style={textStyle_small}>{props.project.mainDescriptionEN}</p>
                <p style={textStyle_small}>{props.project.mainDescriptionKR}</p>
                <p style={textStyle_small}>{props.project.subDescription}</p>
                {
                  props.project.link && <a href={props.project.link[0]} target='_blank' rel='noreferrer' style={textStyle_small} className='link'>{props.project.link[1]}</a>
                }
                <Youtube project={props.project} />
                <ProjectPDF mobile={props.mobile} project={props.project} />
                <ProjectImage mobile={props.mobile} style={wrapperStyle} project={props.project} className={classStat} onLoadedData={showClass} />
                {
                    props.project.status === "music" &&
                    (
                        <>
                            <br />
                            <p style={{ ...textStyle_small, textAlign: "center", marginTop: '0px' }}>{props.project.linkCenter[1]}
                              <br/>
                            <a href={props.project.linkCenter[0]} target='_blank' rel='noreferrer' style={{ ...textStyle_small, textAlign: "center", marginTop: '0px' }} className='link'>{"Link"}</a>
                            </p>
                        </>
                    )
                }
                {
                    props.project.status === "music" && props.project.listCenter.map(function (list, index) {
                        return (
                            <React.Fragment key={index}>
                                <p style={{ ...textStyle_small, textAlign: "center", marginTop: '0px' }}>{list}</p>
                                <br />
                            </React.Fragment>
                        );
                    })
                }
                <br />
            </div>
        </ProjectContext.Provider>
    );
}

export default ProjectInfo;
