import React, { useState, createContext, useContext } from 'react';
import projectsdat from './projects_data.json'
import './App.css';


let projects = projectsdat.data;

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
                <p style={textStyle}>{currentProject.year}</p>
                <p style={textStyle}>{currentProject.scope}</p>
                <p style={textStyle_small}>{currentProject.mainDescriptionEN}</p>
                <p style={textStyle_small}>{currentProject.mainDescriptionKR}</p>
                <p style={textStyle_small}>{currentProject.subDescription}</p>
                <a href={currentProject.link[0]} target='_blank' rel='noreferrer' style={textStyle_small} className='link'>{currentProject.link[1]}</a>
                <ProjectImage mobile = {props.mobile} style={wrapperStyle} projectIndex = {props.projectIndex} className={classStat} onLoadedData={showClass}/>
                <ProjectVideo mobile = {props.mobile} projectIndex = {props.projectIndex}/>
                <Youtube projectIndex = {props.projectIndex} />
            </div>
        </ProjectContext.Provider>
        
    )
}

export default ProjectInfo;